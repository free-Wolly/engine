// @ts-ignore
import { combineResolvers } from 'graphql-resolvers';
import { isManager, generateSearchQuery } from '../../utils';
import formatMessage from '../../localization/intl';
import { ContextType } from '../../services/createServer';
import {
  MutationCreateCountryArgs,
  MutationUpdateCountryArgs,
  QueryGetAllCountriesArgs,
  QueryGetCountryArgs,
} from 'graphql/generated/graphql';

export default {
  Query: {
    getCountry: (_: unknown, { code }: QueryGetCountryArgs, { db }: ContextType) =>
      db.country.findUnique({ where: { code } }),
    getAllCountries: async (_: unknown, args: QueryGetAllCountriesArgs, { db }: ContextType) => {
      const { whereQuery, sortQuery, skip, take } = generateSearchQuery(args);
      return db.country.findMany({
        skip,
        take,
        where: {
          ...whereQuery,
        },
        ...sortQuery,
      });
    },
  },
  Mutation: {
    createCountry: async (_: unknown, { data }: MutationCreateCountryArgs, { db }: ContextType) =>
      db.country.create({ data }),
    updateCountry: async (_: unknown, { data }: MutationUpdateCountryArgs, { db }: ContextType) =>
      db.country.update({ where: { code: data.code }, data }),
    deleteCountry: combineResolvers(
      isManager,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { code },
        { db, req: { language } }: ContextType,
      ) => {
        await db.country.delete({ where: { code } });
        return { message: formatMessage(language, 'common.deletedSuccessfully') };
      },
    ),
  },
};
