import { ContextType } from '../../services/createServer';
import { QueryCheckOrderLimitForDayArgs, QueryGetCountryArgs } from 'graphql/generated/graphql';

export const MAX_DAILY_LIMIT = 1;

export default {
  Query: {
    checkOrderLimitForDay: async (_: unknown, { date }: QueryCheckOrderLimitForDayArgs, { db }: ContextType) => {
      // check date format is YYYY-MM-DD
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        throw new Error('Invalid date format, please provide date in YYYY-MM-DD format');
      }
      const limit = await db.dailyOrderLimit.findUnique({ where: { date } });
      if (!limit) {
        await db.dailyOrderLimit.create({ data: { date, limit: MAX_DAILY_LIMIT } });
        return true;
      } else {
        return limit.limit > 0;
      }
    },
  },
};
