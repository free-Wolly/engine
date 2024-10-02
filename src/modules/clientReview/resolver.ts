// @ts-ignore
import { combineResolvers } from 'graphql-resolvers';
import { isManager, validateInput, generateSearchQuery, isAuthenticated } from '../../utils';
import { updateClientRating } from './helpers';
import formatMessage from '../../localization/intl';
import { ContextType } from '../../services/createServer';
import { MutationCreateClientReviewArgs } from 'graphql/generated/graphql';

export default {
  Query: {
    // @ts-ignore
    getClientReview: combineResolvers(isAuthenticated, async (_, { id }, { db }: ContextType) =>
      db.clientReview.findUnique({ where: { id }, include: { order: true, client: true } }),
    ),
    // @ts-ignore
    getClientAllReviews: combineResolvers(isAuthenticated, async (_, args, { db }: ContextType) => {
      const { whereQuery, sortQuery, skip, take } = generateSearchQuery(args);
      const { clientId } = args;

      return db.clientReview.findMany({
        skip,
        take,
        include: {
          order: true,
          client: true,
        },
        where: {
          deleted: false,
          ...whereQuery,
          clientId,
        },
        ...sortQuery,
      });
    }),
  },
  Mutation: {
    createClientReview: async (
      // @ts-ignore
      _: unknown,
      // @ts-ignore
      { data }: MutationCreateClientReviewArgs,
      { db, req: { language } }: ContextType,
    ) => {

      const { rating, comment, orderId } = data;
      const order = await db.order.findUnique({
        where: { id: orderId },
      });

      if (!order) {
        throw new Error('aee gelik');
      }

      const { clientId } = order;

      const review = await db.clientReview.create({
        data: {
          rating,
          ...(comment && { comment }),
          order: { connect: { id: orderId } },
          client: { connect: { id: clientId } },
        },
      });

      await updateClientRating(db, clientId);
      return review;
    },

    // @ts-ignore
    updateClientReview: async (_, { data }: UpdateClientReviewInput, { db }: ContextType) => {
      const { id, rating } = data;
      const review = await db.clientReview.update({ where: { id }, data });
      if (rating && review.clientId) {
        await updateClientRating(db, review.clientId);
      }
      return review;
    },
    deleteClientReview: combineResolvers(
      isManager,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { id },
        { db, req: { language } }: ContextType,
      ) => {
        const deletedReview = await db.clientReview.update({ where: { id }, data: { deleted: true } });

        await updateClientRating(db, deletedReview.clientId);
        return { message: formatMessage(language, 'common.deletedSuccessfully') };
      },
    ),
  },
};
