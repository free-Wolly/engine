import { PaymentStatus, QueryGetClientsChartArgs, QueryGetExpensesChartArgs, QueryGetOrdersChartArgs, QueryGetProfitArgs, QueryGetRevenueArgs } from '../../graphql/generated/graphql';
import { ContextType } from 'index';
import { ravenueFormater, expenseFormater, profitFormater, orderChartFormater } from './helpers';

export default {
  Query: {
    getRevenue: async (_: unknown, { data }: QueryGetRevenueArgs, { db }: ContextType) => {
      const { start, end } = data;
      const orders = await db.order.findMany({
        where: {
          startTime: {
            gte: start,
          },
          endTime: {
            lte: end,
          },
          paymentStatus: PaymentStatus.Paid,
        },
      });

      const result = ravenueFormater(orders);

      return result;
    },
    getProfit: async (_: unknown, { data }: QueryGetProfitArgs, { db }: ContextType) => {
      const { start, end } = data;
      const orders = await db.order.findMany({
        where: {
          startTime: {
            gte: start,
          },
          endTime: {
            lte: end,
          },
          paymentStatus: PaymentStatus.Paid,
        },
      });

      const result = profitFormater(orders);

      return result;
    },
    getExpensesChart: async (_: unknown, { data }: QueryGetExpensesChartArgs, { db }: ContextType) => {
      const { start, end } = data;
      const orders = await db.order.findMany({
        where: {
          startTime: {
            gte: start,
          },
          endTime: {
            lte: end,
          },
          paymentStatus: PaymentStatus.Paid,
        },
      });

      const result = expenseFormater(orders);
      return result;
    },
    getOrdersChart: async (_: unknown, { data }: QueryGetOrdersChartArgs, { db }: ContextType) => {
      const { start, end } = data;
      const orders = await db.order.findMany({
        where: {
          startTime: {
            gte: start,
          },
          endTime: {
            lte: end,
          },
          paymentStatus: PaymentStatus.Paid,
        },
      });

      const result = orderChartFormater(orders);
      return result;
    },
    getClientsChart: async (_: unknown, { data }: QueryGetClientsChartArgs, { db }: ContextType) => {
      const { start, end } = data;
      const clients = await db.client.findMany({
        where: {
          createdAt: {
            gte: start,
            lte: end,
          },
        },
      });

      let result = clients.reduce((sum, current) => {
        const dateObject = current.createdAt;
        const dateString = dateObject.toISOString();
        const dateOnly = dateString.substring(0, 10);
        if (sum[dateOnly]) {
          sum[dateOnly] = sum[dateOnly] + 1;
        } else {
          sum[dateOnly] = 1;
        }
        return sum;
      }, {});

      let finalResult = Object.keys(result).map(date => {
        return {
          date: date,
          client: result[date],
        };
      });

      return finalResult;
    },
  },
};
