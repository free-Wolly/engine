// @ts-ignore
import { combineResolvers } from 'graphql-resolvers';
import { isManager, validateInput, generateSearchQuery, isAuthenticated } from '../../utils';
import formatMessage from '../../localization/intl';
import { ContextType } from '../../services/createServer';
import { ONGOIND_ORDER_STATUS } from './types';

export default {
  Query: {
    // @ts-ignore
    getBusyTime: combineResolvers(isAuthenticated, async (_, { id }, { db }: ContextType) =>
      db.busyTime.findUnique({ where: { id } }),
    ),
    // @ts-ignore
    getAllBusyTimes: combineResolvers(isAuthenticated, async (_, args, { db }: ContextType) => {
      const { whereQuery, sortQuery, skip, take } = generateSearchQuery(args);
      const { employeeId, toolId } = args;
      return db.busyTime.findMany({
        skip,
        take,
        include: {
          employee: true,
          tool: true,
        },
        where: {
          ...whereQuery,
          employeeId,
          ...(employeeId && { employeeId }),
          ...(toolId && { toolId }),
        },
        ...sortQuery,
      });
    }),
  },
  Mutation: {
    createBusyTime: combineResolvers(
      isAuthenticated,
      validateInput,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { data },
        { db, req: { language } }: ContextType,
      ) => {
        const { employeeId, toolId, ...rest } = data;

        if (!employeeId && !toolId) {
          throw new Error(formatMessage(language, 'busyTime.missingId'));
        }

        return db.busyTime.create({
          data: {
            ...rest,
            ...(employeeId && {
              employee: {
                connect: {
                  id: employeeId,
                },
              },
            }),
            ...(toolId && {
              tool: {
                connect: {
                  id: toolId,
                },
              },
            }),
          },
        });
      },
    ),
    updateBusyTime: combineResolvers(
      isManager,
      validateInput,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { data },
        { db, req: { language } }: ContextType,
      ) => {
        const busyTime = await db.busyTime.findUnique({ where: { id: data.id } });
        if (!busyTime) {
          throw new Error(formatMessage(language, 'errors.recordToUpdateNotFound'));
        }
        if (busyTime.assignedOrderId) {
          const order = await db.order.findUnique({ where: { id: busyTime.assignedOrderId } });
          if (order && order.status in ONGOIND_ORDER_STATUS) {
            throw new Error(formatMessage(language, 'busyTime.canNotUpdate'));
          }
        }
        return db.busyTime.update({
          where: { id: data.id },
          data,
        });
      },
    ),
    deleteBusyTime: combineResolvers(
      isManager,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { id },
        { db, req: { language } }: ContextType,
      ) => {
        const busyTime = await db.busyTime.findUnique({ where: { id } });
        if (busyTime && busyTime.assignedOrderId) {
          const order = await db.order.findUnique({ where: { id: busyTime.assignedOrderId } });
          if (order && order.status in ONGOIND_ORDER_STATUS) {
            throw new Error(formatMessage(language, 'busyTime.canNotDelete'));
          }
        }
        await db.busyTime.delete({ where: { id } });
        return { message: formatMessage(language, 'common.deletedSuccessfully') };
      },
    ),
  },
};
