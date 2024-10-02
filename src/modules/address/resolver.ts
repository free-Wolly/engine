// @ts-ignore
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, generateSearchQuery } from '../../utils';
import formatMessage from '../../localization/intl';
import { OrderStatus } from '../order/types';
import { ContextType } from '../../services/createServer';
import type {
  MutationCreateAddressArgs,
  MutationCreateAddressByAdminArgs,
  MutationUpdateAddressArgs,
  QueryGetAddressArgs,
  QueryGetAllAddressesArgs,
} from 'graphql/generated/graphql';
import { Prisma } from '@prisma/client';
import moment from 'moment';
import { floor } from 'lodash';

const resolvers = {
  Query: {
    // // @ts-ignore
    // getAddress: combineResolvers(isAuthenticated, async (_, {}, { db }: ContextType) => {
    //   const address = await db.address.findUnique({
    //     where: { id },
    //     include: {
    //       city: true,
    //     },
    //   });
    //   if (!address || address?.deleted) {
    //     throw new Error(formatMessage('KA', 'errors.recordNotFound'));
    //   }
    //   return address;
    // }),
    // getAddress: async (_, { id }, { db }) => {
    getAddress: async (_: unknown, { id }: QueryGetAddressArgs, { db, req: { language } }: ContextType) => {
      const address = await db.address.findUnique({
        where: { id } as Prisma.AddressWhereUniqueInput,
        include: {
          city: true,
        },
      });
      if (!address || address?.deleted) {
        throw new Error(formatMessage(language, 'errors.recordNotFound'));
      }
      return address;
    },
    getAllAddresses: async (_: unknown, args: QueryGetAllAddressesArgs, { db, req: { userId } }: ContextType) => {
      const { whereQuery, sortQuery, skip, take } = generateSearchQuery(args);

      return db.address.findMany({
        skip,
        take,
        include: {
          city: true,
        },
        where: {
          ...whereQuery,
          clientId: userId,
          deleted: false,
        },
        ...sortQuery,
      });
    },
  },
  Mutation: {
    createAddress: async (
      _: unknown,
      { data }: MutationCreateAddressArgs,
      { db, req: { userId, language } }: ContextType,
    ) => {
      const { cityId, ...address } = data;
      const city = await db.city.findUnique({ where: { id: cityId } });
      if (!city) {
        throw new Error(formatMessage(language, 'address.cityNotFound'));
      }
      return db.address.create({
        data: {
          ...address,
          city: {
            connect: {
              id: cityId,
            },
          },
          client: {
            connect: {
              id: userId,
            },
          },
        },
      });
    },
    createAddressByAdmin: async (
      _: unknown,
      { data }: MutationCreateAddressByAdminArgs,
      { db, req: { language } }: ContextType,
    ) => {
      try {
        const { cityId, clientId, ...address } = data;

        // Find city by ID
        const city = await db.city.findUnique({ where: { id: cityId } });
        if (!city) {
          throw new Error(formatMessage(language, 'address.cityNotFound'));
        }

        // Find client by ID
        const client = await db.client.findUnique({ where: { id: clientId } });
        if (!client) {
          throw new Error(formatMessage(language, 'address.userIdNotFound'));
        }

        // Create address
        const newAddress = await db.address.create({
          data: {
            ...address,
            city: { connect: { id: cityId } },
            client: { connect: { id: clientId } },
          },
        });

        return newAddress;
      } catch (error) {
        throw new Error(formatMessage(language, 'address.createError'));
      }
    },
    updateAddress: async (_: unknown, { data }: MutationUpdateAddressArgs, { db, req: { language } }: ContextType) => {
      const { cityId, street, details, latitude, longitude, entrance, apartment, floor } = data;
      const foundAddress = await db.address.findUnique({ where: { id: data.id } });
      if (!foundAddress) {
        throw new Error(formatMessage(language, 'errors.recordToUpdateNotFound'));
      }

      const inProgressOrders = await db.order.findMany({
        where: {
          OR: [{ status: OrderStatus.IN_PROGRESS }, { status: OrderStatus.DISPATCHED }],
          addressId: data.id,
        },
      });

      if (inProgressOrders.length) {
        throw new Error(
          'მისამართზე მიბმულია მიმდინარე სერვისი, შეცვლას შეძლებთ სერვისის დასრლების შემდეგ ან დაუკავშირდით ოპერატორს',
        );
      }

      const newOrders = await db.order.findMany({
        where: {
          status: OrderStatus.NEW,
          addressId: data.id,
        },
      });
      if (newOrders.length) {
        newOrders.forEach(order => {
          if (moment().diff(order.startTime, 'hours') < 6) {
            throw new Error('მისამართზე მიბმულია მიმდინარე სერვისი, შეცვლას შეძლებთ სერვისის დასრლების შემდეგ');
          }
        });
      }

      return await db.address.update({
        where: { id: data.id },
        data: {
          ...(street && { street }),
          ...(details && { details }),
          ...(latitude && { latitude }),
          ...(longitude && { longitude }),
          ...(floor && { floor }),
          ...(apartment && { apartment }),
          ...(entrance && { entrance }),
          ...(cityId && {
            city: {
              connect: { id: cityId },
            },
          }),
        },
        include: {
          city: true,
        },
      });
    },
    deleteAddress: combineResolvers(
      isAuthenticated,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { id },
        { db, req: { language } }: ContextType,
      ) => {
        const orders = await db.order.findMany({
          where: {
            OR: [{ status: OrderStatus.NEW }, { status: OrderStatus.IN_PROGRESS }, { status: OrderStatus.DISPATCHED }],
            addressId: id,
          },
        });
        if (orders.length) {
          throw new Error(formatMessage(language, 'address.canNotDelete'));
        }

        await db.address.update({ where: { id }, data: { deleted: true } });

        return {
          message: formatMessage(language, 'address.deletedSuccessfully'),
        };
      },
    ),
  },
};

export default resolvers;
