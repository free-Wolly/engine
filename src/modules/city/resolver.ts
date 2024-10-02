// @ts-ignore
import { combineResolvers } from 'graphql-resolvers';
import { isManager, generateSearchQuery } from '../../utils';
import formatMessage from '../../localization/intl';
import type { QueryGetAllCitiesArgs, QueryGetCityArgs, Resolvers } from 'graphql/generated/graphql';
import { IPrismaContext } from 'prisma/IPrismaContext';
import { Prisma } from '@prisma/client';

const resolvers: Resolvers = {
  Query: {
    getCity: async (_: unknown, { id }: QueryGetCityArgs, { db }: IPrismaContext) => {
      const where: Prisma.CityWhereUniqueInput = { id };
      const city = await db.city.findUnique({
        where,
        include: { country: true },
      });
      if (!city) {
        throw new Error(formatMessage('KA', 'errors.recordNotFound'));
      }
      return city;
    },
    getAllCities: async (_, args: QueryGetAllCitiesArgs, { db }) => {
      const { whereQuery, sortQuery, skip, take } = generateSearchQuery(args);
      return db.city.findMany({
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
    createCity: async (_, { data }, { db }) => {
      const { countryCode, ...cityData } = data;
      return db.city.create({
        data: {
          ...cityData,
          country: {
            connect: {
              code: countryCode,
            },
          },
        },
      });
    },
    // updateCity: async (_, { data }, { db }: ContextType) => db.city.update({ where: { id: data.id }, data }),
    deleteCity: combineResolvers(
      isManager,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { id },
        {
          // @ts-ignore
          db,
          req: {
            // @ts-ignore
            language,
          },
        },
      ) => {
        await db.city.delete({ where: { id } });
        return { message: formatMessage(language, 'common.deletedSuccessfully') };
      },
    ),
  },
  ApolloCity: {
    // @ts-ignore
    country: async ({ countryCode }: unknown, _args, { db }) => db.country.findUnique({ where: { code: countryCode } }),
  },
};

export default resolvers;
