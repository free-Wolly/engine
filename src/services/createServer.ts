import { ApolloServer } from 'apollo-server-express';
import typeDefs from '../schemas';
import resolvers from '../resolvers';
import db from './db';
import { formatError, isAuthenticated, newIsAdmin, newIsAuthenticated, newIsManager } from '../utils';
import { PrismaClient } from '@prisma/client';
import { shield } from 'graphql-shield';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { Client, Language, User } from 'graphql/generated/graphql';
import WebSocket from 'ws';

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
      getAllCrmOrders: newIsManager,
      getAllAddresses: newIsAuthenticated,
      getDocument: newIsManager,
      getAllOrders: newIsAuthenticated,
      getMessages: newIsAuthenticated,
      getClientLatestChatId: newIsAuthenticated,
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
    },
  },
  { debug: true },
);

const createServer = () => {
  const schema = applyMiddleware(
    makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
    permissions,
  );

  return new ApolloServer({
    schema,
    csrfPrevention: true,
    middlewares: [permissions],
    context: (req: any) => ({ ...req, db: db as PrismaClient<{}, never> }),
    tracing: true,
    formatError,
    credentials: true,
    origin: (origin: string, callback: any) => {
      const whitelist = [
        'http://localhost:3000',
        'https://wolly-crm.vercel.app',
        'https://crm.wolly.ge/',
        'https://crm-staging.wolly.ge/',
        'https://wolly-',
      ];
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  } as any) as any;
};

export default createServer;
