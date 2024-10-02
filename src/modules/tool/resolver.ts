// @ts-ignore
import { combineResolvers } from 'graphql-resolvers';
import { isManager, generateSearchQuery } from '../../utils';
import formatMessage from '../../localization/intl';
import { OrderStatus } from '@prisma/client';
import { ContextType } from 'services/createServer';
import {
  MutationCreateToolArgs,
  MutationUpdateToolArgs,
  QueryGetAllToolsArgs,
  QueryGetToolArgs,
} from 'graphql/generated/graphql';

export default {
  Query: {
    getTool: async (_: unknown, { id }: QueryGetToolArgs, { db }: ContextType) => db.tool.findUnique({ where: { id } }),
    getAllTools: async (_: unknown, args: QueryGetAllToolsArgs, { db }: ContextType) => {
      const { whereQuery, sortQuery, skip, take } = generateSearchQuery(args);
      return db.tool.findMany({
        skip,
        take,
        where: {
          deleted: false,
          ...whereQuery,
        },
        ...sortQuery,
      });
    },
  },
  Mutation: {
    createTool: async (_: unknown, { data }: MutationCreateToolArgs, { db }: ContextType) => db.tool.create({ data }),
    updateTool: async (_: unknown, { data: { id, ...rest } }: MutationUpdateToolArgs, { db }: ContextType) =>
      db.tool.update({ where: { id }, data: rest }),
    deleteTool: combineResolvers(
      isManager,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { id },
        { db, req: { language } }: ContextType,
      ) => {
        const orders = await db.order.findMany({
          include: { assignedEmployees: true },
          where: {
            OR: [{ status: OrderStatus.NEW }, { status: OrderStatus.IN_PROGRESS }, { status: OrderStatus.DISPATCHED }],
            AND: [{ assignedEmployees: { some: { id } } }],
          },
          take: 1,
        });
        if (orders.length) {
          throw new Error(formatMessage(language, 'tool.hasOngoingOrder'));
        }
        await db.busyTime.deleteMany({ where: { toolId: id } });
        await db.tool.update({ where: { id }, data: { deleted: true } });

        return { message: formatMessage(language, 'common.deletedSuccessfully') };
      },
    ),
  },
};
