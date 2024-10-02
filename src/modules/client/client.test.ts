import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../schemas';
import resolvers from '../../resolvers';
import db from '../../services/db';
import formatMessage from '../../localization/intl';
import { formatError } from '../../utils';
import { randomNumber } from '../user/user.test';
import { UserRole } from '@prisma/client';

describe('Client RESOLVERS', () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    context: async () => {
      const users = await db.user.findMany({ where: { role: UserRole.MANAGER } });
      const user = users[0];

      return { req: { userId: user.id, me: { language: 'KA', role: user.role } }, db };
    },
  });
  // @ts-ignore
  const { query, mutate } = createTestClient(server);

  // @ts-ignore
  let clientId;

  it('FETCH ALL clients', async () => {
    const GET_ALL_CLIENTS = gql`
      query GetAllClients {
        getAllClients {
          id
          verificationCode
          createdAt
          updatedAt
          firstName
          lastName
          email
          mobile
          rating
          language
          token
          addresses {
            street
          }
          photo
          sms
          pushNotification
        }
      }
    `;

    const { data, errors } = await query({ query: GET_ALL_CLIENTS });
    errors?.[0] && console.error(errors[0].message);

    if (data?.getAllClients) {
      clientId = data?.getAllClients[0]?.id;
    }
    expect(Array.isArray(data?.getAllClients)).toBeTruthy();
    // @ts-ignore
    expect(clientId).toBeTruthy();
  });

  it('FETCH client by id', async () => {
    const GET_CLIENT = gql`
      query GetClient($id: String!) {
        getClient(id: $id) {
          id
        }
      }
    `;

    // @ts-ignore
    const { data, errors } = await query({ query: GET_CLIENT, variables: { id: clientId } });

    errors?.[0] && console.error(errors[0].message);
    // @ts-ignore
    expect(data?.getClient.id).toEqual(clientId);
    expect(data?.getClient.id).toBeTruthy();
  });

  const UPDATE_CLIENT = gql`
    mutation UpdateClient(
      $id: String!
      $firstName: String
      $password: String
      $lastName: String
      $email: String
      $mobile: String
      $language: Language
      $photo: String
      $smsEnabled: Boolean
      $notificationsEnabled: Boolean
      $verificationCode: String
    ) {
      updateClient(
        data: {
          id: $id
          firstName: $firstName
          password: $password
          lastName: $lastName
          email: $email
          mobile: $mobile
          language: $language
          photo: $photo
          smsEnabled: $smsEnabled
          notificationsEnabled: $notificationsEnabled
          verificationCode: $verificationCode
        }
      ) {
        message
      }
    }
  `;

  // @ts-ignore
  let newClient;
  it('Update Client', async () => {
    newClient = await db.client.create({ data: { language: 'KA', mobile: randomNumber } });

    const { data, errors } = await mutate({
      mutation: UPDATE_CLIENT,
      variables: { id: newClient.id, firstName: 'Jondy', lastName: 'heyy' },
    });

    errors?.[0] && console.error(errors[0].message);
    expect(data?.updateClient?.message).toEqual(formatMessage('KA', 'common.updatedSuccessfully'));
  });

  const DELETE_CLIENT = gql`
    mutation DeleteClient($id: String!) {
      deleteClient(id: $id) {
        message
      }
    }
  `;

  it('Delete Client', async () => {
    const { data, errors } = await mutate({
      mutation: DELETE_CLIENT,
      // @ts-ignore
      variables: { id: newClient.id },
    });

    errors?.[0] && console.error(errors[0].message);
    expect(data?.deleteClient?.message).toEqual(formatMessage('KA', 'common.deletedSuccessfully'));
  });
  server.stop();
});
