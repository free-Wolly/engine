// @ts-ignore
import { combineResolvers } from 'graphql-resolvers';
import { isManager, generateSearchQuery, isAuthenticated } from '../../utils';
import { updateClientRating } from '../clientReview/helpers';
import formatMessage from '../../localization/intl';
import { OrderStatus } from '../order/types';
import { ContextType } from 'services/createServer';
import {
  MutationCreateSimpleClientArgs,
  MutationUpdateClientArgs,
  MutationUpdateClientPhotoArgs,
  QueryGetAllClientsArgs,
  QueryGetClientArgs,
} from 'graphql/generated/graphql';
import { connect } from 'http2';
import { trackError } from '../../services/sentry';

export default {
  Query: {
    getClient: async (_: unknown, { id }: QueryGetClientArgs, { db }: ContextType) => {
      const client = await db.client.findUnique({
        where: { id },
        include: {
          addresses: {
            include: {
              city: true,
            },
          },
        },
      });
      return client;
    },

    getAllClients: async (_: unknown, args: QueryGetAllClientsArgs, { db }: ContextType) => {
      const { whereQuery, sortQuery, skip, take } = generateSearchQuery(args);
      return db.client.findMany({
        skip,
        take,
        include: {
          addresses: {
            include: {
              city: true,
            },
          },
        },
        where: {
          deleted: false,
          ...whereQuery,
        },
        ...sortQuery,
      });
    },
  },
  Mutation: {
    createSimpleClient: async (_: unknown, { input }: MutationCreateSimpleClientArgs, { db }: ContextType) => {
      const { firstName, lastName, email, mobile, cityId, street, details, birthDate } = input;
      const client = await db.client.create({
        data: {
          firstName,
          lastName,
          ...(email && { email }),
          mobile,
          isSimpleClient: true,
          isVerified: true,
          birthDate,
          addresses: {
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
        include: {
          addresses: {
            include: {
              city: true,
            },
          },
        },
      });
      return client;
    },

    updateClientPhoto: async (_: unknown, { data }: MutationUpdateClientPhotoArgs, { db, req }: ContextType) => {
      const client = await db.client.update({
        where: { id: req.meClient.id },
        data: {
          photo: data.photo,
        },
      });
      return client;
    },

    updateClient: async (_: unknown, { data }: MutationUpdateClientArgs, { db, req: { language } }: ContextType) => {
      const { id, ...rest } = data;

      const client = await db.client.update({
        where: { id },
        data: {
          ...rest,
        },
      });

      return client;
    },
    deleteClient: combineResolvers(
      isAuthenticated,
      async (
        // @ts-ignore
        _,
        // @ts-ignore
        { id },
        { db, req: { language, userId } }: ContextType,
      ) => {
        if (id !== userId) {
          throw new Error('id is not equal to an actual logged user');
        }

        const orders = await db.order.findMany({
          where: {
            OR: [{ status: OrderStatus.NEW }, { status: OrderStatus.IN_PROGRESS }, { status: OrderStatus.DISPATCHED }],
            clientId: userId,
          },
          take: 1,
        });

        if (orders.length) {
          throw new Error(formatMessage(language, 'client.hasOngoingOrder'));
        }

        try {
          await db.client.delete({ where: { id } });
        } catch (e) {
          trackError(e);
          throw new Error(formatMessage(language, 'client.deleteClientError'));
        }

        // try {
        //   await db.order.delete({ where: { clientId: userId } });
        // } catch (error) {
        //   throw new Error(formatMessage(language, 'client.deleteOrderError'));
        // }
        // try {
        //   await db.address.updateMany({ where: { clientId: userId }, data: { deleted: true } });
        // } catch (error) {
        //   await db.order.updateMany({ where: { clientId: userId }, data: { deleted: false } });
        //   await db.address.updateMany({ where: { clientId: userId }, data: { deleted: false } });
        //   throw new Error(formatMessage(language, 'client.deleteAddressError'));
        // }
        // try {
        //   await db.clientReview.updateMany({ where: { clientId: userId }, data: { deleted: true } });
        //   await updateClientRating(db, userId);
        // } catch (error) {
        //   await db.order.updateMany({ where: { clientId: userId }, data: { deleted: false } });
        //   await db.address.updateMany({ where: { clientId: userId }, data: { deleted: false } });
        //   throw new Error(formatMessage(language, 'client.deleteClientReviewError'));
        // }
        // try {
        //   await db.client.delete({ where: { id: userId }});
        // } catch (error) {
        //   await db.order.updateMany({ where: { clientId: userId }, data: { deleted: false } });
        //   await db.address.updateMany({ where: { clientId: userId }, data: { deleted: false } });
        //   await db.clientReview.updateMany({ where: { clientId: userId }, data: { deleted: false } });

        //   throw new Error(formatMessage(language, 'client.deleteClientError'));
        // }
        return { message: formatMessage(language, 'common.deletedSuccessfully') };
      },
    ),
  },
};
