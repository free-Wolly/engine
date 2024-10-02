import { generateSearchQuery } from '../../utils';
import formatMessage from '../../localization/intl';
import { Employee, OrderStatus, Prisma } from '@prisma/client';
import { ContextType } from 'services/createServer';
import {
  MutationCreateEmployeeArgs,
  MutationDeleteEmployeeArgs,
  MutationPickedEmployeesForSwapArgs,
  MutationSwapEmployeesArgs,
  MutationUpdateEmployeeArgs,
  QueryGetAllEmployeesArgs,
  QueryGetEmployeeArgs,
} from 'graphql/generated/graphql';
import { IPrismaContext } from 'prisma/IPrismaContext';
import { ApolloError } from 'apollo-server-core';
import { toNumber } from 'lodash';
import { trackError } from '../../services/sentry';

export default {
  Query: {
    getEmployee: async (_: unknown, { id }: QueryGetEmployeeArgs, { db }: ContextType): Promise<Employee | null> => {
      const employee = await db.employee.findUnique({
        where: { id },
        include: {
          address: { include: { city: true } },
          workingDaysAndHours: true,
          busyTimes: true,
          assignedOrders: true,
        },
      });
      return employee;
    },
    getAllEmployees: async (_: unknown, args: QueryGetAllEmployeesArgs, { db }: ContextType) => {
      const { whereQuery, sortQuery, skip, take } = generateSearchQuery(args);
      const employees = await db.employee.findMany({
        skip,
        take,
        include: {
          address: { include: { city: true } },
          workingDaysAndHours: true,
          busyTimes: true,
          assignedOrders: true,
        },
        where: {
          deleted: false,
          ...whereQuery,
        },
        ...sortQuery,
      });
      return employees;
    },
  },
  Mutation: {
    createEmployee: async (_: unknown, { data }: MutationCreateEmployeeArgs, { db }: IPrismaContext) => {
      const { street, details, cityId, workingDaysAndHours, specialities, ...employeeData } = data;

      try {
        await db.employee.create({
          data: {
            ...employeeData,
            specialities: {
              set: specialities,
            },
            address: {
              create: {
                city: {
                  connect: {
                    id: cityId,
                  },
                },
                street,
                details,
              },
            },
            workingDaysAndHours: {
              create: [...workingDaysAndHours],
            },
          },
        });
      } catch (error) {
        trackError(error);
        // @TODO probable better to enhance existing formatError function with below code, make it more re-usable
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ApolloError(
              // @ts-ignore
              `Employee already exists with given ${error.meta?.target}`,
            );
          }
        }
        throw error;
      }
    },
    updateEmployee: async (_: unknown, { data }: MutationUpdateEmployeeArgs, { db }: IPrismaContext) => {
      try {
        const {
          street,
          details,
          cityId,
          addressId,
          workingDaysAndHours,
          password,
          speakingLanguages,
          specialities,
          id,
          // @TODO Irakli remove isAvailable and put unavailableFrom and unavailableTo in model
          // @TODO Alex change getAvailableEmployees logic from isAvailable to unavailableFrom and unavailableTo +
          // @TODO Alex look into Tools if it correctly works for slots generation
          // unavailableFrom,
          // unavailableTo,
          // isAvailable,
          ...employeeData
        } = data;
        const blockOrNot: boolean[] = [];

        //TODO: this logic must be in service but i am too lazy to do so
        if (workingDaysAndHours) {
          const busyTimes = await db.busyTime.findMany({
            where: {
              employeeId: id,
            },
          });

          if (busyTimes.length > 0) {
            busyTimes.map(b => {
              // @ts-ignore
              const busyFromDay = b.busyFrom.getDay() - 1;
              // @ts-ignore
              const busyFromHours = b.busyFrom.getUTCHours();
              // @ts-ignore
              const busyToHours = b.busyTo.getUTCHours();
              const test = workingDaysAndHours.map(n => {
                const startTime = n.startTime.split(':');
                const starTimeNumber = toNumber(startTime[0]);
                const endTime = n.endTime.split(':');
                const endTimeNumber = toNumber(endTime[0]);
                return (
                  busyFromDay >= n.startWeekday &&
                  busyFromDay <= n.endWeekday &&
                  busyFromHours >= starTimeNumber &&
                  busyToHours <= endTimeNumber
                );
              });
              blockOrNot.push(test.includes(true));
            });
          }
        }

        if (blockOrNot.includes(false)) {
          throw new Error('VER GAMOVIDA');
        }

        // error message, order Id
        const updatedEmployee = await db.employee.update({
          where: { id },
          data: {
            ...employeeData,
            ...(specialities && {
              specialities: {
                set: specialities,
              },
            }),
            address: {
              update: {
                ...(street && { street }),
                details,
                ...(cityId && {
                  city: {
                    connect: {
                      id: cityId,
                    },
                  },
                }),
              },
            },
            ...(workingDaysAndHours && {
              workingDaysAndHours: {
                deleteMany: {},
                create: workingDaysAndHours,
              },
            }),
          },
          include: {
            address: {
              include: {
                city: true,
              },
            },
          },
        });
        return updatedEmployee;
      } catch (error) {
        trackError(error);
        throw error;
      }
    },
    deleteEmployee: async (_: unknown, { id }: MutationDeleteEmployeeArgs, { db, req: { language } }: ContextType) => {
      // @TODO Alex check if employee has any future order (booked message(=)
      const orders = await db.order.findMany({
        // include: { assignedEmployees: true },
        where: {
          OR: [{ status: OrderStatus.NEW }, { status: OrderStatus.IN_PROGRESS }, { status: OrderStatus.DISPATCHED }],
          // AND: [{ assignedEmployees: { some: { id } } }],
        },
        take: 1,
      });
      if (orders.length) {
        throw new Error(formatMessage(language, 'employee.employeeHasOngoingOrder'));
      }
      // try {
      //   await db.order.updateMany({ where:
      //     { assignedEmployees: { some: { id } } },
      //     data: { deleted: true } });
      // } catch (error) {
      //   throw new Error(formatMessage(language, 'client.deleteOrderError'));
      // }
      // try {
      //   await db.address.updateMany({ where: { employeeId: id }, data: { deleted: true } });
      // } catch (error) {
      //   await db.order.updateMany({ where: { assignedEmployees: { some: { id } } }, data: { deleted: false } });
      //   throw new Error(formatMessage(language, 'client.deleteAddressError'));
      // }
      // try {
      //   await db.employeeReview.updateMany({ where: { employeeId: id }, data: { deleted: true } });
      //   await recalculateEmployeeRating(db, id);
      // } catch (error) {
      //   await db.address.updateMany({ where: { employeeId: id }, data: { deleted: false } });
      //   await db.order.updateMany({ where: { assignedEmployees: { some: { id } } }, data: { deleted: false } });
      //   throw new Error(formatMessage(language, 'client.deleteClientReviewError'));
      // }
      // try {
      //   await db.workingDayAndHour.deleteMany({ where: { employeeId: id } });
      // } catch (error) {
      //   await db.address.updateMany({ where: { employeeId: id }, data: { deleted: false } });
      //   await db.employeeReview.updateMany({ where: { employeeId: id }, data: { deleted: false } });
      //   await db.order.updateMany({ where: { assignedEmployees: { some: { id } } }, data: { deleted: false } });
      //   throw new Error(formatMessage(language, 'employee.busyTimeDeleteError'));
      // }
      // try {
      //   await db.busyTime.deleteMany({ where: { employeeId: id } });
      // } catch (error) {
      //   await db.address.updateMany({ where: { employeeId: id }, data: { deleted: false } });
      //   await db.employeeReview.updateMany({ where: { employeeId: id }, data: { deleted: false } });
      //   await db.order.updateMany({ where: { assignedEmployees: { some: { id } } }, data: { deleted: false } });
      //   throw new Error(formatMessage(language, 'employee.busyTimeDeleteError'));
      // }
      // try {
      //   await db.employee.update({ where: { id }, data: { deleted: true } });
      // } catch (error) {
      //   await db.address.updateMany({ where: { employeeId: id }, data: { deleted: false } });
      //   await db.order.updateMany({ where: { assignedEmployees: { some: { id } } }, data: { deleted: false } });
      //   await db.employeeReview.updateMany({ where: { employeeId: id }, data: { deleted: false } });
      //   throw new Error(formatMessage(language, 'errors.unknownError'));
      // }
      return { message: formatMessage(language, 'common.deletedSuccessfully') };
    },

    async pickedEmployeesForSwap(_: unknown, { data }: MutationPickedEmployeesForSwapArgs, { db }: IPrismaContext) {
      const order = await db.order.findFirst({
        where: {
          id: data.orderId,
        },
        include: {
          assignedEmployees: true,
        },
      });

      const employee = await db.employee.findFirst({
        where: {
          id: data.employeeId,
        },
      });

      if (!order || !employee) {
        throw new Error('ORDER WAS NOT FOUND');
      }

      const startTime: Date = order.startTime;

      return await db.employee.findMany({
        where: {
          specialities: { hasSome: employee.specialities },
          NOT: {
            busyTimes: {
              some: {
                busyFrom: {
                  lte: startTime,
                },
                busyTo: {
                  gte: startTime,
                },
              },
            },
          },
        },
        include: { busyTimes: true, workingDaysAndHours: true },
      });
    },

    async swapEmployees(_: unknown, { data }: MutationSwapEmployeesArgs, { db }: IPrismaContext) {
      const employee = await db.employee.findFirst({
        where: {
          id: data.newEmployeeId,
        },
      });

      const busyOne = await db.busyTime.findFirst({
        where: {
          assignedOrderId: data.orderId,
          employeeId: data.previousEmployeeId,
        },
      });

      if (!employee || !busyOne || !busyOne.assignedOrderId) {
        throw new Error('NOT FOUND');
      }

      await db.busyTime.delete({
        where: {
          id: busyOne.id,
        },
      });

      const order = await db.order.findUnique({
        where: { id: busyOne.assignedOrderId },
        include: {
          assignedEmployees: true,
          assignedTools: true,
          client: true,
          // products: true,
        },
      });

      if (!order) {
        throw new Error('NOT FOUND');
      }

      const orderEmployees = [...order.assignedEmployees.map(({ id }) => id), data.newEmployeeId];

      await db.order.update({
        where: {
          id: busyOne.assignedOrderId,
        },
        data: {
          assignedEmployees: {
            connect: orderEmployees.map(id => ({ id })),
            disconnect: { id: data.previousEmployeeId },
          },
        },
      });

      await db.busyTime.create({
        data: {
          busyFrom: busyOne.busyFrom,
          busyTo: busyOne.busyTo,
          employee: {
            connect: {
              id: employee.id,
            },
          },
          assignedOrderId: data.orderId,
        },
      });

      return order;
    },
  },
};
