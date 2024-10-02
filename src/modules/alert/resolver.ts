// @ts-ignore
import { combineResolvers } from 'graphql-resolvers';
import { isManager, validateInput } from '../../utils';

export default {
  Query: {
    // @ts-ignore
    getAlert: combineResolvers(isManager, async (_, { id }, { db }) =>
      db.alert.findUnique({
        where: { id },
      }),
    ),
    // @ts-ignore
    getAllAlerts: combineResolvers(isManager, async (_, _args, { db }) => db.alert.findMany()),
  },
  Mutation: {
    createAlert: combineResolvers(
      isManager,
      validateInput,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        args,
        {
          // @ts-ignore
          db,
        },
        // @ts-ignore
        info,
      ) => {
        const { data } = args;
        const alert = await db.alert.create(
          {
            data,
            // order: {
            //     connect: {
            //         id: targetUserId,
            //     },
            // },
          },
          info,
        );
        return alert;
      },
    ),
    // @ts-ignore
    updateAlert: combineResolvers(isManager, validateInput, async (_, { data }, { db }, info) =>
      db.alert.update(
        {
          where: { id: data.id },
          data,
        },
        info,
      ),
    ),
    // @ts-ignore
    deleteAlert: combineResolvers(isManager, async (_, { alertId }, { db }, info) =>
      db.alert.delete(
        {
          where: { id: alertId },
        },
        info,
      ),
    ),
  },
};
