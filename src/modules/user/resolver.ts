import bcrypt from 'bcryptjs';
// @ts-ignore
import { combineResolvers } from 'graphql-resolvers';
import { isAdmin, validateInput, generateSearchQuery, isAuthenticated } from '../../utils';
import formatMessage from '../../localization/intl';
import transformUser from '../../utils/transformers';
import { ContextType } from 'services/createServer';
import {
  MutationCreateUserArgs,
  MutationUpdateUserArgs,
  QueryGetAllUsersArgs,
  QueryGetUserArgs,
} from 'graphql/generated/graphql';
import { Token } from 'graphql';

export default {
  Query: {
    getUser: async (_: unknown, { id }: QueryGetUserArgs, { db }: ContextType) =>
      db.user.findUnique({
        where: { id },
        include: {
          address: {
            include: {
              city: true,
            },
          },
        },
      }),
    getAllUsers: async (_: unknown, args: QueryGetAllUsersArgs, { db }: ContextType) => {
      const { whereQuery, sortQuery, skip, take } = generateSearchQuery(args);
      return db.user.findMany({
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
    createUser: async (_: unknown, { data }: MutationCreateUserArgs, { db }: ContextType) => {
      const { password, cityId, street, details, ...rest } = data;
      const hashedPassword = await bcrypt.hash(data.password, 10);
      //@FIX create two users with the same address returns error
      const user = await db.user.create({
        data: {
          ...rest,
          password: hashedPassword,
          address: {
            create: {
              city: {
                connect: {
                  id: cityId,
                },
              },
              street,
              details,
            },
          },
        },
      });
      return transformUser(user);
    },
    updateUser: async (
      _: unknown,
      { data: { userId, ...data }, language }: MutationUpdateUserArgs,
      {
        db,
        req: {
          // language,
        },
      }: ContextType,
    ) => {
      const { street, cityId, details, ...rest } = data;
      const user = await db.user.update({
        where: { id: userId },
        data: {
          ...rest,
          address: {
            update: {
              ...(street && { street }),
              details,
              ...(cityId && {
                city: {
                  connect: {
                    id: cityId,
                  },
                },
              }),
            },
          },
          language,
        },
        include: {
          address: {
            include: {
              city: true,
            },
          },
        },
      });
      return transformUser(user);
    },
    deleteUser: combineResolvers(
      isAdmin,
      validateInput,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { id },
        { db, req: { language } }: ContextType,
      ) => {        
        await db.user.update({
          where: { id },
          data: { deleted: true },
        });
        return { message: formatMessage(language, 'common.deletedSuccessfully') };
      },
    ),
  },
};
