import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../schemas';
import resolvers from '../../resolvers';
import db from '../../services/db';
import formatMessage from '../../localization/intl';
import { formatError } from '../../utils';
import { UserRole } from '@prisma/client';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,
  context: async () => {
    const users = await db.user.findMany({ where: { role: UserRole.MANAGER } });
    const user = users[0];

    return { req: { userId: user.id, me: { language: 'KA', role: user.role } }, db };
  },
});
// @ts-ignore
const { query, mutate } = createTestClient(server);

describe('Client Review RESOLVERS', () => {
  // @ts-ignore
  let clientReviewId;
  // @ts-ignore
  let newClientReviewId;
  let clientId;
  let orderId;

  const CREATE_CLIENT_REVIEW = gql`
    mutation CreateClientReview($rating: Float!, $comment: String, $orderId: String!) {
      createClientReview(data: { rating: $rating, comment: $comment, orderId: $orderId }) {
        id
        rating
        comment
      }
    }
  `;

  it('CREATE Client Review', async () => {
    const orders = await db.order.findMany();
    orderId = orders[0].id;

    const { data, errors } = await mutate({
      mutation: CREATE_CLIENT_REVIEW,
      variables: { rating: 3, comment: 'Good Job!', orderId },
    });

    errors?.[0] && console.error(errors[0].message);
    newClientReviewId = data?.createClientReview.id;
    expect(!!data?.createClientReview).toBeTruthy();
  });

  it('FETCH Client All Reviews', async () => {
    const review = await db.clientReview.findMany();
    clientId = review[0].clientId;
    const GET_CLIENT_ALL_REVIEWS = gql`
      query getClientAllReviews($clientId: String!) {
        getClientAllReviews(clientId: $clientId) {
          id
          rating
          comment
          order {
            id
          }
        }
      }
    `;

    const { data, errors } = await query({ query: GET_CLIENT_ALL_REVIEWS, variables: { clientId } });

    errors?.[0] && console.error(errors[0].message);

    if (data?.getClientAllReviews) {
      clientReviewId = data?.getClientAllReviews[0]?.id;
    }
    expect(Array.isArray(data?.getClientAllReviews)).toBeTruthy();
    // @ts-ignore
    expect(clientReviewId).toBeTruthy();
  });

  it('FETCH client review by id', async () => {
    const GET_CLIENT_REVIEW = gql`
      query GetClientReview($id: String!) {
        getClientReview(id: $id) {
          id
          rating
        }
      }
    `;

    // @ts-ignore
    const { data, errors } = await query({ query: GET_CLIENT_REVIEW, variables: { id: clientReviewId } });

    errors?.[0] && console.error(errors[0].message);
    // @ts-ignore
    expect(data?.getClientReview.id).toEqual(clientReviewId);
    expect(data?.getClientReview.id).toBeTruthy();
  });

  it('CREATE client review with wrong Order Id', async () => {
    const { errors } = await mutate({
      mutation: CREATE_CLIENT_REVIEW,
      variables: { rating: 3, comment: 'Good Job!', orderId: 'wrongOrderId' },
    });
    expect(errors?.[0]?.message).toEqual(formatMessage('KA', 'order.orderNotFound'));
  });

  const UPDATE_CLIENT_REVIEW = gql`
    mutation UpdateClientReview($id: String!, $rating: Float, $comment: String) {
      updateClientReview(data: { id: $id, rating: $rating, comment: $comment }) {
        id
        rating
        comment
      }
    }
  `;

  it('UPDATE Client review', async () => {
    const { data, errors } = await mutate({
      mutation: UPDATE_CLIENT_REVIEW,
      variables: {
        // @ts-ignore
        id: newClientReviewId,
        rating: 1,
        comment: 'Bad Job!',
      },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.updateClientReview.comment).toEqual('Bad Job!');
    expect(data?.updateClientReview.rating).toEqual(1);
  });

  it('DELETE Client review', async () => {
    const DELETE_CLIENT_REVIEW = gql`
      mutation DeleteClientReview($id: String!) {
        deleteClientReview(id: $id) {
          message
        }
      }
    `;

    const { data, errors } = await mutate({
      mutation: DELETE_CLIENT_REVIEW,
      // @ts-ignore
      variables: { id: newClientReviewId },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.deleteClientReview?.message).toEqual(formatMessage('KA', 'common.deletedSuccessfully'));
  });

  server.stop();
});
