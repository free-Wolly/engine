import { pubsub } from '../index';
import axios from 'axios';
import { getPaymentToken } from '../modules/payments/tbc/helpers';
import db from './db';
import { trackError } from './sentry';

export const paymentCallback = async (paymentId: string, res: any) => {
  return new Promise(async (resolve, reject) => {
    const PAYMENT_DETAILS_URL = `https://api.tbcbank.ge/v1/tpay/payments/${paymentId}`;

    try {
      const paymentToken = await getPaymentToken();

      const paymentStatus = await axios.get(PAYMENT_DETAILS_URL, {
        headers: {
          'Content-Type': 'application/json',
          apikey: 'PekAIu7AoR4qgPpA3AEheMyuxgmnksA8',
          Authorization: `Bearer ${paymentToken}`,
        },
      });

      const { status } = paymentStatus?.data;

      const updatedPayment = await db.payments.findMany({
        where: {
          paymentId,
        },
      });

      // const existingOrder = await db.order.findFirst({
      //   where: {
      //     paymentsId: paymentId,
      //   },
      // });

      // if (existingOrder && status === 'Succeeded') {
      //   await db.order.update({
      //     where: {
      //       id: existingOrder.id,
      //     },
      //     data: {
      //       paymentStatus: 'PAID',
      //     },
      //   });
      // }

      await db.payments.update({
        where: {
          id: updatedPayment[0].id,
        },
        data: {
          status: status,
        },
      });

      // const key = await redisClient.get('test');

      res.sendStatus(200);

      pubsub.publish(`PAYMENT_STATUS_UPDATED_${paymentId}`, { paymentStatusUpdated: paymentStatus?.data?.status });

      resolve('done');
    } catch (error) {
      trackError(error);
      reject(error);
    }
  });
};
