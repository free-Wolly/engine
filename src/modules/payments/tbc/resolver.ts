import axios from 'axios';
import { MutationCreatePaymentArgs } from 'graphql/generated/graphql';
import { ContextType } from 'services/createServer';
import { getPaymentToken } from './helpers';
import { pubsub } from '../../../index';
import { trackError } from '../../../services/sentry';

export default {
  Query: {},
  Mutation: {
    createPayment: async (
      _: unknown,
      { data }: MutationCreatePaymentArgs,
      { db, req: { language, meClient } }: ContextType,
    ) => {
      try {
        const { amount, returnurl } = data;
        const paymentToken = await getPaymentToken();
        const response = await axios.post(
          'https://api.tbcbank.ge/v1/tpay/payments',
          {
            amount: {
              currency: amount.currency,
              total: amount.total,
            },
            returnurl,
            methods: [5],
            callbackUrl: process.env.CALLBACK_URL,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              apikey: 'PekAIu7AoR4qgPpA3AEheMyuxgmnksA8',
              Authorization: `Bearer ${paymentToken}`,
            },
          },
        );

        const { data: paymentData } = response;

        await db.payments.create({
          data: {
            paymentId: paymentData.payId,
            status: paymentData.status,
            currency: paymentData.currency,
            amount: paymentData.amount,
            clientId: meClient.id
          },
        });

        return paymentData;
      } catch (error) {
        console.error(error)
        trackError(error);
      }
    },
  },

  Subscription: {
    paymentStatusUpdated: {
      subscribe: (_: unknown, { paymentId }: { paymentId: string }) => {
        return pubsub.asyncIterator([`PAYMENT_STATUS_UPDATED_${paymentId}`]);
      },
    },
  },
};
