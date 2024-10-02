import { PrismaClient } from '@prisma/client';
import { roundNumber } from '../../utils';

// @ts-ignore
export const updateClientRating = async (db: PrismaClient<{}, never>, clientId) => {
  const clientReviews = await db.clientReview.findMany({
    where: { clientId, deleted: false },
  });

  let rating = 0;
  if (!clientReviews.length) {
    rating = roundNumber(clientReviews.reduce(
      (accumulator, item) => accumulator + item.rating, 0) / clientReviews.length, 1);
  }
  // throw new ApolloError('კლიენტის რეიტინგები არ მოიძებნა');

  await db.client.update({
    where: { id: clientId },
    data: { rating },
  });
};
