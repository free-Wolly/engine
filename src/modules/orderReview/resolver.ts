import { MutationCreateOrderReviewArgs, MutationUpdateOrderReviewArgs } from 'graphql/generated/graphql';
import { ContextType } from 'index';
import { trackError } from '../../services/sentry';

export default {
  Query: {
    getAllOrderReviews: async (_s: unknown, _a: unknown, { db }: ContextType) => {
      return db.orderReview.findMany();
    },
    getOrderReview: async (_s: unknown, { id }: { id: string }, { db }: ContextType) => {
      try {
        const orderReview = await db.orderReview.findUnique({
          where: { id },
        });

        if (!orderReview) {
          throw new Error('Order Review not found');
        }

        return orderReview;
      } catch (error) {
        trackError(error);
        return null;
      }
    },
  },
  Mutation: {
    createOrderReview: async (_s: unknown, { data }: MutationCreateOrderReviewArgs, { db }: ContextType) => {
      try {
        const orderReview = await db.orderReview.create({
          data: {
            rating: data.orderRating,
            comment: data.comment,
            order: { connect: { id: data.orderId } },
          },
        });

        return orderReview;
      } catch (error) {
        trackError(error);
        return null;
      }
    },
    updateOrderReview: async (_s: unknown, { data }: MutationUpdateOrderReviewArgs, { db }: ContextType) => {
      try {
        const updatedOrderReview = await db.orderReview.update({
          where: { id: data.id },
          data: {
            rating: data.orderRating,
            comment: data.comment,
          },
        });

        return updatedOrderReview;
      } catch (error) {
        trackError(error);
        return null;
      }
    },
    deleteOrderReview: async (_s: unknown, { id }: { id: string }, { db }: ContextType) => {
      try {
        const deletedOrderReview = await db.orderReview.delete({
          where: { id },
        });

        return deletedOrderReview;
      } catch (error) {
        trackError(error);
        return null;
      }
    },
  },
};
