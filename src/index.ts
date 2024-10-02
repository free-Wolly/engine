require('./config');

import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';
import resolvers from './resolvers';
import redis from 'ioredis';
import typeDefs from './schemas';
import db from './services/db';
import { formatError, newIsAdmin, newIsAuthenticated, newIsManager } from './utils';
import { PrismaClient } from '@prisma/client';
import { Client, Language, User, WollyErrorCodes } from './graphql/generated/graphql';
import * as jwt from 'jsonwebtoken';

import { shield } from 'graphql-shield';
import { applyMiddleware } from 'graphql-middleware';
import { paymentCallback } from '../src/services/callBackService';
import { ApolloServer } from '@apollo/server';
import app, { AuthType, JwtTokenType } from '../src/app';
import { Context } from 'graphql-ws';
import formatMessage from './localization/intl';
import { ApolloError } from 'apollo-server-core';
import { trackError } from './services/sentry';
import { startOrderNotifications } from './cron/orderSms';

export interface ContextType {
  db: PrismaClient<{}, never>;
  res: any;
  req: {
    userId: string;
    meClient: Client;
    meCrmUser: User;
    language: Language;
  };
}

export const pubsub = new PubSub();

const permissions = shield(
  {
    Query: {
      getAddress: newIsAuthenticated,
      getAllEmployees: newIsManager,
      getEmployee: newIsManager,
      getAllTools: newIsManager,
      getTool: newIsManager,
      getAllUsers: newIsAdmin,
      getUser: newIsAdmin,
      getAllClients: newIsManager,
      getClient: newIsManager,
      getCountry: newIsManager,
      getAllCountries: newIsManager,
      getCity: newIsManager,
      getAllCities: newIsManager,
      // getAllChat: newIsManager,
      // @TODO: add isMANAGER to this query
      // getAllCrmOrders: newIsManager,
      getAllAddresses: newIsAuthenticated,
      getAllOrders: newIsAuthenticated,
      getAllOrderReviews: newIsAdmin,
      getOrderReview: newIsAdmin,
      // getRevenue: newIsAdmin
    },
    Mutation: {
      createEmployee: newIsManager,
      updateEmployee: newIsManager,
      createUser: newIsAdmin,
      updateUser: newIsAdmin,
      // updateClient: newIsManager,
      createCountry: newIsManager,
      updateCountry: newIsManager,
      createCity: newIsManager,
      updateCity: newIsManager,
      createOrder: newIsAuthenticated,
      updateMyProfile: newIsAuthenticated,
      // verifyCode: newIsAuthenticated,
      createAddress: newIsAuthenticated,
      createAddressByAdmin: newIsAdmin,
      updateAddress: newIsAuthenticated,
      createSimpleClient: newIsManager,
      createPayment: newIsAuthenticated,
      createSimpleOrder: newIsAuthenticated,
      cancelSimpleOrder: newIsAuthenticated,
      deleteSimpleOrder: newIsManager,
      createClientReview: newIsAuthenticated,
      updateClientPhoto: newIsAuthenticated,
      createOrderReview: newIsAuthenticated,
      updateOrderReview: newIsAdmin,
      deleteOrderReview: newIsAdmin,
    },
    // Subscription: {
    //   messageSent: newIsAuthenticated,
    // },
  },
  { debug: true },
);

const run = async () => {
  const schema = applyMiddleware(
    makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
    permissions,
  );

  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/api',
  });

  const getDynamicContext = async (ctx: Context, msg: any, args: any) => {
    if (ctx.connectionParams?.Authorization) {
      const { userId } = jwt.verify(
        ctx.connectionParams?.Authorization as string,
        process.env.APP_SECRET || '',
      ) as JwtTokenType;
      if (!userId) {
        throw new Error(formatMessage('EN', 'common.unknownError'));
      }
      return { userId };
    }
    return { userId: null };
  };

  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx, msg, args) => {
        const newContextPart = await getDynamicContext(ctx, msg, args);
        return { ...ctx, db: db as PrismaClient<{}, never>, req: newContextPart };
      },
    },
    wsServer,
  );

  const server = new ApolloServer<ContextType>({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    nodeEnv: process.env.NODE_ENV,

    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    formatError,
  });

  await server.start();
  app.use(express.json());

  // app.post('/updatePaymentStatus', async (req, res) => {
  //   await paymentCallback(req.body?.PaymentId, res);
  // });

  // startOrderNotifications();

  app.use(
    '/api',
    cors<cors.CorsRequest>({
      origin: [
        'http://localhost:3000',
        'https://wolly-crm.vercel.app',
        'https://wolly-crm-git-main-wolly.vercel.app',
        'https://crm.wolly.ge',
        'https://crm-staging.wolly.ge',
        '*',
      ],
      credentials: true,
    }),
    expressMiddleware(server, {
      context: async ({ req }: any) => {
        let userId,
          meCrmUser,
          meClient = null;
        let language = Language.En;

        try {
          const { authorization: authToken, language: headerLanguage } = req?.headers ?? {};
          const { token: cookieToken, language: cookieLanguage } = req?.cookies ?? {};
          const token = authToken ?? cookieToken;
          language = headerLanguage || cookieLanguage;

          if (token) {
            const { userId: verifiedUserId, authType } = jwt.verify(
              token,
              process.env.APP_SECRET || '',
            ) as JwtTokenType;

            if (!verifiedUserId) throw new Error();
            userId = verifiedUserId;
            language = language;

            if (authType === AuthType.user) {
              const user = await db.user.findUnique({ where: { id: userId } });
              if (!user) throw new Error();
              meCrmUser = user;
            } else if (authType === AuthType.client) {
              const client = await db.client.findUnique({ where: { id: userId } });
              if (!client) throw new Error();

              meClient = client;
            }
          }
        } catch (error: any) {
          trackError(error);
          throw new ApolloError(error.message, WollyErrorCodes.InvalidToken);
        }

        return {
          ...req,
          req: {
            userId,
            meCrmUser,
            meClient,
            language,
          },
          db: db as PrismaClient<{}, never>,
        };
      },
    }),
  );

  httpServer.listen(process.env.PORT || 4000, () => {
    console.log(`🚀 Endpoint ready at http://localhost:${process.env.PORT || 4000}/api`);
  });
};

run();
