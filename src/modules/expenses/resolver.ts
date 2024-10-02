import { MutationCreateExpenseArgs, QueryGetExpenseArgs } from 'graphql/generated/graphql';
import { ContextType } from 'index';
import formatMessage from '../../localization/intl';

export default {
  Query: {
    getExpense: async (_: unknown, { data }: QueryGetExpenseArgs, { db, req: { language } }: ContextType) => {
      try {
        const expenses = await db.expenses.findMany({
          include: {
            document: true,
          },
        });

        return expenses;
      } catch (error) {
        throw new Error(formatMessage(language, 'expense.getExpenseError'));
      }
    },
  },
  Mutation: {
    createExpense: async (_: unknown, { data }: MutationCreateExpenseArgs, { db, req: { language } }: ContextType) => {
      try {
        const expense = await db.expenses.create({
          data: {
            ...data,
          },
          include: {
            document: true,
          },
        });

        return expense;
      } catch (error) {
        throw new Error(formatMessage(language, 'expense.createExpenseError'));
      }
    },
  },
};
