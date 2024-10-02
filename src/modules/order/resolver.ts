// @ts-ignore
import { combineResolvers } from 'graphql-resolvers';
import moment from 'moment';
import { isAdmin, generateSearchQuery, validateInput, isAuthenticated } from '../../utils';
import { cleanupOrderBusyTimes, createOrderBusyTimes } from './helpers';
import formatMessage from '../../localization/intl';
import { OrderStatus } from './types';
import sendSMS from '../../services/sms';
import {
  MutationCreateOrderArgs,
  QueryGetAllOrdersArgs,
  MutationCreateSimpleOrderArgs,
  PaymentStatus,
  UserRole,
  MutationCancelSimpleOrderArgs,
  MutationUpdateOrderArgs,
  MutationSendNotificationByPushTokenArgs,
} from '../../graphql/generated/graphql';
import { MAX_DAILY_LIMIT } from '../dailyOrderLimit/resolver';
import sendNotification from '../../services/sendNotification';
import { trackError } from '../../services/sentry';
import { sendSlackNotification } from '../../modules/liveChat/helpers';
import { EventDetails, createEvent, deleteEvent } from '../../services/googleCalendar';
import { ContextType } from 'index';

export default {
  Query: {
    // @ts-ignore
    getOrder: combineResolvers(isAuthenticated, async (_, { id }, { db }: ContextType) =>
      db.order.findUnique({
        where: { id },
        include: {
          apartmentCleaning: true,
          chemicalCleaning: true,
          swimmingPoolCleaning: true,
          maid: true,
          assignedEmployees: {
            include: { address: true },
          },
          assignedTools: true,
          client: true,
          // products: true,
          address: {
            include: {
              city: true,
            },
          },
          document: true,
        },
      }),
    ),
    getAllOrders: async (_: unknown, args: QueryGetAllOrdersArgs, { db, req: { userId, language } }: ContextType) => {
      const { whereQuery, sortQuery, skip, take } = generateSearchQuery(args);
      let orders = [];
      if (userId === '1' || userId === '2' || userId === '3') {
        orders = await db.order.findMany({
          skip,
          take,
          where: {
            ...whereQuery,
            status: {
              in: OrderStatus.IN_PROGRESS,
            },
          },
          include: {
            address: true,
            apartmentCleaning: true,
            maid: true,
            chemicalCleaning: true,
            swimmingPoolCleaning: true,
          },
          ...sortQuery,
        });
      } else {
        orders = await db.order.findMany({
          skip,
          take,
          where: {
            ...whereQuery,
            clientId: userId,
          },
          include: {
            // assignedEmployees: true,
            // assignedTools: true,
            // client: true,
            // products: true,
            address: true,
            apartmentCleaning: true,
            maid: true,
            chemicalCleaning: true,
            swimmingPoolCleaning: true,
          },
          ...sortQuery,
        });
      }

      return orders;
    },
    getAllCrmOrders: async (_: unknown, args: QueryGetAllOrdersArgs, { db }: ContextType) => {
      const { sortQuery, skip, take } = generateSearchQuery(args);
      const { clientId, filters } = args;

      const { priceFrom, priceTo, startTimeTo, startTimeFrom, createdAtTo, createdAtFrom, ...rest } = filters || {};

      const orders = await db.order.findMany({
        skip,
        take,
        include: {
          client: true,
          address: true,
          apartmentCleaning: true,
        },
        where: {
          price: {
            ...(priceTo && {
              lte: priceTo,
            }),
            ...(priceFrom && {
              gte: priceFrom,
            }),
          },
          startTime: {
            ...(startTimeTo && {
              lte: startTimeTo,
            }),
            ...(startTimeFrom && {
              gte: startTimeFrom,
            }),
          },
          createdAt: {
            ...(createdAtTo && {
              lte: createdAtTo,
            }),
            ...(createdAtFrom && {
              gte: createdAtFrom,
            }),
          },
          ...(rest as any),
          // filters,
          // ...whereQuery,
          clientId: clientId || undefined,
        },
        ...sortQuery,
      });

      return orders;
    },
  },
  Mutation: {
    createSimpleOrder: async (
      _: unknown,
      { data }: MutationCreateSimpleOrderArgs,
      { db, req: { userId, language, meCrmUser, meClient } }: ContextType,
    ) => {
      const clientID = meClient?.id;
      const { clientId = clientID, addressId, paymentStatus, ...rest } = data;
      const orderDate = data.startTime;

      // convert iso orderDate to YYYY-MM-DD
      const orderDateFormatted = moment(orderDate).format('YYYY-MM-DD');
      let limit = await db.dailyOrderLimit.findUnique({ where: { date: orderDateFormatted } });

      if (!limit) {
        limit = await db.dailyOrderLimit.create({ data: { date: orderDateFormatted, limit: MAX_DAILY_LIMIT } });
      }

      const createdOrders = await db.order.findMany({
        where: {
          clientId:
            meCrmUser?.role === UserRole.Admin || meCrmUser?.role === UserRole.Manager ? clientId || '' : userId,
          OR: [
            { status: OrderStatus.NEW },
            { status: OrderStatus.IN_PROGRESS },
            { status: OrderStatus.DISPATCHED },
            { status: OrderStatus.SEEN },
          ],
        },
      });

      if (createdOrders.length > 0 && !(meCrmUser?.role === UserRole.Admin || meCrmUser?.role === UserRole.Manager)) {
        throw new Error(formatMessage('KA', 'order.deleteOrderWhileOtherExists'));
      }

      if (limit.limit <= 0) {
        throw new Error('Daily order limit reached');
      }

      try {
        const order = await db.order.create({
          data: {
            ...rest,
            client: {
              connect: {
                id:
                  meCrmUser?.role === UserRole.Admin || meCrmUser?.role === UserRole.Manager ? clientId || '' : userId,
              },
            },
            address: {
              connect: { id: data.addressId },
            },
            chemicalCleaning: {
              create: {
                ...data.chemicalCleaning,
              },
            },
            swimmingPoolCleaning: {
              ...(data.swimmingPoolCleaning && {
                create: {
                  ...data.swimmingPoolCleaning,
                },
              }),
            },
            maid: {
              ...(data.maid && {
                create: {
                  ...data.maid,
                },
              }),
            },
            apartmentCleaning: {
              create: {
                ...data.apartmentCleaning,
              },
            },
            status: OrderStatus.NEW,
            paymentStatus: PaymentStatus.Unpaid,
            seenByManager: meCrmUser?.role === UserRole.Admin || meCrmUser?.role === UserRole.Manager ? true : false,
          },
          include: {
            client: true,
            address: true,
          },
        });
        // decrement limit propert from dailyOrderLimit table for orderDateFormatted
        await db.dailyOrderLimit.update({
          where: { date: orderDateFormatted },
          data: { limit: limit.limit - 1 },
        });

        const eventDetails: EventDetails = {
          summary: `${order.serviceType}       ${order.serviceSubType}`,
          location: `${order.address.street}`,
          description: `${order.client.firstName} ${order.client.lastName} - ${order.client.mobile}\n\ncomment: ${order.comment}`,
          start: {
            dateTime: `${data.startTime}`,
            timeZone: 'Asia/Tbilisi',
          },
          end: {
            dateTime: `${data.endTime}`,
            timeZone: 'Asia/Tbilisi',
          },
        };

        const calendarEvent = await createEvent(eventDetails);

        await db.orderEvent.create({
          data: {
            eventId: calendarEvent.id ?? 'test',
            order: {
              connect: { id: order.id },
            },
          },
        });

        const orderLink = `https://crm.wolly.ge/orders/${order.id}`;
        if (process.env.NODE_ENV === 'production') {
          await sendSMS('571192240', `გაკეთდა ახალი შეკვეთა, გთხოვთ შეამოწმოთ!, ლინკი ორდერზე: ${orderLink}`, '');
          await sendSMS('551215621', `გაკეთდა ახალი შეკვეთა, გთხოვთ შეამოწმოთ!, ლინკი ორდერზე: ${orderLink}`, '');
        }

        sendSlackNotification(
          `ახალი შეკვეთა 🥳 - https://crm.wolly.ge/orders/${order.id}`,
          'https://hooks.slack.com/services/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',
        );

        return order;
      } catch (error) {
        console.error(error);
        trackError(error);

        return null;
      }
    },
    cancelSimpleOrder: async (_: unknown, { id }: MutationCancelSimpleOrderArgs, { db }: ContextType) => {
      // find order by id
      const order = await db.order.findUnique({ where: { id } });
      const date = moment(order?.startTime).format('YYYY-MM-DD');
      const orderUpdated = await db.order.update({
        where: { id },
        data: {
          status: OrderStatus.CANCELLED,
        },
      });

      const orderCalendarEvent = await db.orderEvent.findUnique({ where: { orderId: id } });
      if (orderCalendarEvent) {
        await deleteEvent(orderCalendarEvent.eventId);
      }
      const limit = await db.dailyOrderLimit.findUnique({ where: { date } });
      if (limit) {
        // increment limit propert from dailyOrderLimit table for orderDateFormatted
        await db.dailyOrderLimit.update({
          where: { date },
          data: { limit: limit.limit + 1 },
        });
      }
      return orderUpdated;
    },
    deleteSimpleOrder: async (_: unknown, { id }: MutationCancelSimpleOrderArgs, { db }: ContextType) => {
      const orderDeleted = await db.order.delete({
        where: { id },
      });
      return orderDeleted;
    },
    createOrder: async (
      _s: unknown,
      { data }: MutationCreateOrderArgs,
      {
        db,
        req: {
          userId,
          // language,
        },
      }: ContextType,
    ) => {
      const { startTime, endTime, assignedToolsIds, assignedEmployeesIds, addressId, ...rest } = data;

      const start = new Date(startTime);
      const end = new Date(endTime);

      const order = await db.order.create({
        data: {
          ...rest,
          // TODO implement real function for price calculation
          status: OrderStatus.NEW,
          startTime: start,
          endTime: end,
          client: { connect: { id: userId } },
          address: {
            connect: { id: addressId },
          },
          assignedEmployees: {
            connect: assignedEmployeesIds.map(id => ({ id })),
          },
        } as any,
      });

      sendSlackNotification(
        `Order created 🥳 - https://crm.wolly.ge/orders/${order.id}`,
        'https://hooks.slack.com/services/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',
      );

      // send sms to admin (Sandro or Iraklis phone for now)
      const assignedEmployees = await createOrderBusyTimes({
        db,
        ids: assignedEmployeesIds,
        orderId: order.id,
        busyTo: end,
        busyFrom: start, // + 1 saaati
        connectTo: 'employee',
      });

      const assignedTools =
        assignedToolsIds &&
        (await createOrderBusyTimes({
          db,
          ids: assignedToolsIds,
          orderId: order.id,
          busyTo: end,
          busyFrom: start,
          connectTo: 'tool',
        }));

      if (!assignedEmployees || (assignedToolsIds && !assignedTools)) {
        await cleanupOrderBusyTimes({ db, assignedOrderId: order.id });
        await db.order.delete({ where: { id: order.id } });
        // return { error: formatMessage(language, 'order.slotTaken') };
        return { error: formatMessage('EN', 'order.slotTaken') };
      }
      return order;
    },
    updateOrder: async (
      _s: unknown,
      { data }: MutationUpdateOrderArgs,
      {
        db,
        req: {
          userId,
          meCrmUser,
          meClient,
          // language,
        },
      }: ContextType,
    ) => {
      const { id } = data;
      // const order = await db.order.findUnique({
      //   where: { id },
      //   include: {
      //     // assignedEmployees: {
      //     //   include: { address: true },
      //     // },
      //     assignedTools: true,
      //     client: true,
      //     products: true,
      //   },
      // });

      // if (order) {
      // const start = new Date(startTime);
      // if (moment().diff(order.startTime, 'hours') < 6) {
      //   throw new Error(formatMessage(language, 'order.doNotUpdateBefore'));
      // }
      // if (new Date(order.startTime) !== start) {
      // const end = new Date(endTime);
      // order.assignedEmployees.forEach(async (employee) => {
      //   await db.busyTime.updateMany({
      //     where: { employeeId: employee.id, assignedOrderId: id },
      //     data: { busyFrom: start, busyTo: end },
      //   });
      // });
      // order.assignedTools.forEach(async (tool) => {
      //   await db.busyTime.updateMany({
      //     where: { toolId: tool.id, assignedOrderId: id },
      //     data: { busyFrom: start, busyTo: end },
      //   });
      // });
      // }
      // }
      try {
        const updatedOrder = await db.order.update({
          where: { id },
          data: {
            ...data,
          } as any,
          include: {
            // assignedTools: true,
            client: true,
            // assignedEmployees: true,
          },
        });

        if (!meCrmUser) {
          sendSlackNotification(
            `შეკვეთა განახლდა 🙃 - https://crm.wolly.ge/orders/${updatedOrder.id}`,
            'https://hooks.slack.com/services/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',
          );
        }

        if ((data.status as string) === 'CANCELLED') {
          const orderCalendarEvent = await db.orderEvent.findUnique({ where: { orderId: id } });

          if (orderCalendarEvent) {
            await deleteEvent(orderCalendarEvent.eventId);
          }
        }

        if (data.status === 'SEEN' && updatedOrder.client.pushToken) {
          sendNotification({
            pushToken: updatedOrder.client.pushToken,
            body: 'თქვენი შეკვეთა დადასტურებულია',
            type: 'OrderStatusUpdated',
            data: id,
          });
        }

        if (data.status === 'DISPATCHED' && updatedOrder.client.pushToken) {
          sendNotification({
            pushToken: updatedOrder.client.pushToken,
            body: 'თქვენ შეკვეთაზე ჯგუფი გამოსულია',
            type: 'OrderStatusUpdated',
            data: id,
          });
        }

        return updatedOrder;
      } catch (e) {
        trackError(e);
        throw Error('error while updateing the order');
      }
    },

    cancelOrder: combineResolvers(
      isAuthenticated,
      validateInput,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { id },
        { db, req: { language, meCrmUser } }: ContextType,
      ) => {
        try {
          const updatedOrder = await db.order.update({
            where: { id },
            data: {
              status: OrderStatus.CANCELLED,
            },
            include: {
              client: true,
            },
          });

          if (meCrmUser?.id && updatedOrder.client.pushToken) {
            sendNotification({
              pushToken: updatedOrder.client.pushToken,
              body: 'თქვენი შეკვეთა გაუქმებულია',
              type: 'OrderStatusUpdated',
              data: id,
            });
          }
          sendSlackNotification(
            `Order cancelled 🙁 - https://crm.wolly.ge/orders/${updatedOrder.id}`,
            'https://hooks.slack.com/services/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',
          );
          return { message: formatMessage(language, 'order.orderCancelled') };
        } catch (e) {
          trackError(e);
          throw Error('error while canceling order');
        }
      },
    ),
    updateOrderByAdmin: combineResolvers(
      isAdmin,
      validateInput,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { data },
        { db, req: { language } }: ContextType,
      ) => {
        const { orderId, clientId, ...rest } = data;

        return db.order.update({
          where: { id: orderId },
          data: {
            ...rest,
            ...(clientId && {
              client: {
                connect: {
                  id: clientId,
                },
              },
            }),
          },
        });
      },
    ),
    sendNotificationByPushToken: async (
      _: unknown,
      { data }: MutationSendNotificationByPushTokenArgs,
      { db }: ContextType,
    ) => {
      const { pushToken, body, type } = data;

      return sendNotification({ pushToken, body, type });
    },
  },
};
