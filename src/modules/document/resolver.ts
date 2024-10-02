import { MutationCreateDocumentArgs, QueryGetDocumentArgs } from 'graphql/generated/graphql';
import { ContextType } from 'index';
import formatMessage from '../../localization/intl';

export default {
  Query: {
    getDocument: async (_: unknown, { data }: QueryGetDocumentArgs, { db, req: { language } }: ContextType) => {
        console.log({data});
        const document = await db.document.findMany({
          where: {
            ...data
          },
          include: {
            order: true,
            expenses: true,
          },
        });

        console.log({document});
        return document;
    },
  },
  Mutation: {
    createDocument: async (
      _: unknown,
      { data }: MutationCreateDocumentArgs,
      { db, req: { language } }: ContextType,
    ) => {
      try {
        const { orderId, expensesId, url, name } = data;
        const document = await db.document.create({
          data: {
            orderId,
            expensesId,
            url,
            name,
          },
          include: {
            order: true,
            expenses: true,
          },
        });

        return document;
      } catch (error) {
        throw new Error(formatMessage(language, 'document.createError'));
      }
    },
  },
};
