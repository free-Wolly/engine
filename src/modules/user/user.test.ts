import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../schemas';
import resolvers from '../../resolvers';
import db from '../../services/db';
import formatMessage from '../../localization/intl';
import { formatError } from '../../utils';
import { UserRole } from './types';

export const randomNumber = `50${Math.random().toString().slice(2, 9)}`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,
  context: async () => {
    const users = await db.user.findMany({ where: { role: UserRole.ADMIN } });
    const user = users[0];

    return { req: { userId: user.id, me: { language: 'KA', role: user.role } }, db };
  },
});
// @ts-ignore
const { query, mutate } = createTestClient(server);

describe('USER RESOLVERS', () => {
  // @ts-ignore
  let userId;
  // @ts-ignore
  let newUserId;

  const CREATE_USER = gql`
    mutation createUser(
      $firstName: String!
      $lastName: String!
      $password: String!
      $email: String!
      $mobile: String!
      $role: UserRole!
      $addressId: String!
    ) {
      createUser(
        data: {
          firstName: $firstName
          lastName: $lastName
          password: $password
          email: $email
          mobile: $mobile
          role: $role
          addressId: $addressId
        }
      ) {
        id
        firstName
        lastName
        email
      }
    }
  `;

  it('CREATE User', async () => {
    const cities = await db.city.findMany({ take: 1 });
    const address = await db.address.create({
      data: {
        city: {
          connect: {
            id: cities[0].id,
          },
        },
        street: 'Mtsketa str.',
        details: 'norm adgilia',
        latitude: 11,
        longitude: 12,
      },
    });

    const { data, errors } = await mutate({
      mutation: CREATE_USER,
      variables: {
        firstName: 'Sandro',
        lastName: 'Manager',
        mobile: randomNumber,
        password: 'myPassword1',
        email: `${randomNumber}@gmaill.com`,
        role: UserRole.MANAGER,
        addressId: address.id,
      },
    });
    errors?.[0] && console.error(errors[0].message);
    newUserId = data?.createUser.id;
    expect(data?.createUser.firstName).toEqual('Sandro');
    // await db.address.delete({ where: { id: address.id } })
  });

  it('FETCH All Users', async () => {
    const GET_ALL_USERS = gql`
      query GetAllUsers {
        getAllUsers {
          id
          firstName
          lastName
          email
        }
      }
    `;

    const { data, errors } = await query({ query: GET_ALL_USERS });

    errors?.[0] && console.error(errors[0].message);

    if (data?.getAllUsers) {
      userId = data?.getAllUsers[0]?.id;
    }
    expect(Array.isArray(data?.getAllUsers)).toBeTruthy();
    // @ts-ignore
    expect(userId).toBeTruthy();
  });

  it('FETCH User by id', async () => {
    const GET_USER = gql`
      query GetUser($id: String!) {
        getUser(id: $id) {
          id
          firstName
          lastName
        }
      }
    `;

    // @ts-ignore
    const { data, errors } = await query({ query: GET_USER, variables: { id: newUserId } });

    errors?.[0] && console.error(errors[0].message);
    // @ts-ignore
    expect(data?.getUser.id).toEqual(newUserId);
    expect(data?.getUser.id).toBeTruthy();
  });

  xit('DELETE User', async () => {
    const DELETE_USER = gql`
      mutation DeleteUser($id: String!) {
        deleteUser(id: $id) {
          message
        }
      }
    `;

    const { data, errors } = await mutate({
      mutation: DELETE_USER,
      // @ts-ignore
      variables: { id: newUserId },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.deleteUser?.message).toEqual(formatMessage('KA', 'common.deletedSuccessfully'));
  });

  server.stop();
});
