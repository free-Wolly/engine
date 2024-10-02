import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../schemas';
import resolvers from '../../resolvers';
import db from '../../services/db';
import formatMessage from '../../localization/intl';
import { OwnerType } from './types';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const clients = await db.client.findMany();
    const userId = clients[0].id;

    return { req: { userId, me: { language: 'KA' } }, db };
  },
});
// @ts-ignore
const { query, mutate } = createTestClient(server);

describe('ADDRESS RESOLVERS', () => {
  // @ts-ignore
  let newAddressId;

  const CREATE_ADDRESS = gql`
    mutation CreateAddress(
      $city: String!
      $details: String
      $latitude: Float!
      $longitude: Float!
      $street: String!
      $ownerType: UserType!
    ) {
      createAddress(
        data: {
          city: $city
          details: $details
          latitude: $latitude
          longitude: $longitude
          street: $street
          ownerType: $ownerType
        }
      ) {
        id
        details
        latitude
        longitude
        street
      }
    }
  `;
  it('CREATE address', async () => {
    const cities = await db.city.findMany({ take: 1 });

    const { data, errors } = await mutate({
      mutation: CREATE_ADDRESS,
      variables: {
        city: cities[0].name,
        street: 'Mtsketa str.',
        details: 'norm adgilia',
        latitude: 11,
        longitude: 12,
        ownerType: OwnerType.CLIENT,
      },
    });

    errors?.[0] && console.error(errors[0].message);
    newAddressId = data?.createAddress?.id;
    expect(!!data?.createAddress).toBeTruthy();
  });

  test('FETCH ALL addresses', async () => {
    const GET_MY_ADDRESSES = gql`
      query GetAllAddresses($ownerType: UserType!) {
        getAllAddresses(ownerType: $ownerType) {
          id
          details
          street
          city {
            name
          }
          details
        }
      }
    `;

    const { data, errors } = await query({ query: GET_MY_ADDRESSES, variables: { ownerType: OwnerType.CLIENT } });
    if (data?.getAllAddresses) {
      newAddressId = data?.getAllAddresses[0].id;
    }
    errors?.[0] && console.error(errors[0].message);

    expect(Array.isArray(data?.getAllAddresses)).toBeTruthy();
  });

  it('FETCH address by ID', async () => {
    const GET_ADDRESS = gql`
      query GetAddress($id: String!) {
        getAddress(id: $id) {
          id
          details
          street
          city {
            name
          }
          details
        }
      }
    `;
    // @ts-ignore
    const { data, errors } = await query({ query: GET_ADDRESS, variables: { id: newAddressId } });

    errors?.[0] && console.error(errors[0].message);
    // @ts-ignore
    expect(data?.getAddress.id).toEqual(newAddressId);
  });

  it('FETCH address by wrong ID', async () => {
    const GET_ADDRESS = gql`
      query GetAddress($id: String!) {
        getAddress(id: $id) {
          id
          details
          street
          city {
            name
          }
          details
        }
      }
    `;

    const { errors } = await query({ query: GET_ADDRESS, variables: { id: 'wrongId' } });

    expect(errors?.[0]?.message).toEqual(formatMessage('KA', 'errors.recordNotFound'));
  });

  it('CREATE address with non existing City', async () => {
    const { errors } = await mutate({
      mutation: CREATE_ADDRESS,
      variables: {
        city: 'Rustavi',
        street: 'Mtsketa str.',
        details: 'norm adgilia',
        latitude: 11,
        longitude: 12,
        ownerType: OwnerType.CLIENT,
      },
    });

    expect(errors?.[0]?.message).toEqual(formatMessage('KA', 'address.cityNotFound'));
  });

  const UPDATE_ADDRESS = gql`
    mutation UpdateAddress(
      $id: String!
      $city: String
      $details: String
      $latitude: Float
      $longitude: Float
      $street: String
    ) {
      updateAddress(
        data: { id: $id, city: $city, details: $details, latitude: $latitude, longitude: $longitude, street: $street }
      ) {
        id
        details
        latitude
        longitude
        street
      }
    }
  `;
  it('UPDATE address', async () => {
    const { data, errors } = await mutate({
      mutation: UPDATE_ADDRESS,
      // @ts-ignore
      variables: { id: newAddressId, street: 'Abashidze Str.', latitude: 20 },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.updateAddress.latitude).toEqual(20);
    expect(data?.updateAddress.street).toEqual('Abashidze Str.');
  });

  it('UPDATE address with non existing City', async () => {
    const { errors } = await mutate({
      mutation: UPDATE_ADDRESS,
      // @ts-ignore
      variables: { id: newAddressId, street: 'Abashidze Str.', latitude: 20, city: 'Telavi' },
    });

    expect(errors?.[0]?.message).toEqual(formatMessage('KA', 'address.cityNotFound'));
  });

  it('UPDATE address with wrong address id', async () => {
    const { errors } = await mutate({
      mutation: UPDATE_ADDRESS,
      variables: { id: 'wrongId', street: 'Abashidze Str.', latitude: 20 },
    });

    expect(errors?.[0]?.message).toEqual(formatMessage('KA', 'common.unknownError'));
  });

  // it('DELETE address', async () => {
  //   const DELETE_ADDRESS = gql`
  //   mutation DeleteAddress($id: String!) {
  //           deleteAddress(id: $id) {
  //               message
  //           }
  //       }
  //   `

  //   const { data, errors } = await mutate({
  //     mutation: DELETE_ADDRESS,
  //     variables: { id: newAddressId },
  //   });

  //   errors?.[0] && console.error(errors[0].message)

  //   expect(data?.deleteAddress?.message).toEqual(formatMessage('KA', 'address.deletedSuccessfully'));
  // });

  server.stop();
});
