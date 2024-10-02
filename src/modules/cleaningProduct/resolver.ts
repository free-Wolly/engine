// @ts-ignore
import { combineResolvers } from 'graphql-resolvers';
import { isManager, validateInput, generateSearchQuery, isAuthenticated } from '../../utils';
import formatMessage from '../../localization/intl';

export default {
  Query: {
    // @ts-ignore
    getProduct: combineResolvers(isAuthenticated, async (_, { id }, { db }, info) =>
      db.product.findUnique({ where: { id } }, info),
    ),
    // @ts-ignore
    // getAllProducts: combineResolvers(isAuthenticated, async (_, args, { db }, info) => {
    //   const { whereQuery, sortQuery, skip, take } = generateSearchQuery(args);
    //   return db.product.findMany(
    //     {
    //       skip,
    //       take,
    //       where: {
    //         ...whereQuery,
    //       },
    //       ...sortQuery,
    //     },
    //     info,
    //   );
    // }),
  },
  Mutation: {
    // @ts-ignore
    createProduct: combineResolvers(isManager, validateInput, async (_, { data }, { db }, info) =>
      db.product.create({ data }, info),
    ),
    // @ts-ignore
    updateProduct: combineResolvers(isManager, validateInput, async (_, { data }, { db }, info) =>
      db.product.update({ where: { id: data.id }, data }, info),
    ),
    deleteProduct: combineResolvers(
      isManager,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { id },
        {
          // @ts-ignore
          db,
          req: {
            // @ts-ignore
            language,
          },
        },
        // @ts-ignore
        info,
      ) => {
        await db.product.delete({ where: { id } }, info);
        return { message: formatMessage(language, 'common.deletedSuccessfully') };
      },
    ),
  },
};
