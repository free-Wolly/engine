import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../schemas';
import resolvers from '../../resolvers';
import db from '../../services/db';
import formatMessage from '../../localization/intl';
import { formatError } from '../../utils';
import { UserRole } from '@prisma/client';

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

describe('CITY RESOLVERS', () => {
  // @ts-ignore
  let cityId;
  // @ts-ignore
  let newCityId;

  it('FETCH ALL cities', async () => {
    const GET_ALL_CITIES = gql`
      query GetAllCities {
        getAllCities {
          id
          name
        }
      }
    `;

    const { data, errors } = await query({ query: GET_ALL_CITIES });
    errors?.[0] && console.error(errors[0].message);

    if (data?.getAllCities) {
      cityId = data?.getAllCities[0]?.id;
    }
    expect(Array.isArray(data?.getAllCities)).toBeTruthy();
    // @ts-ignore
    expect(cityId).toBeTruthy();
  });

  it('FETCH city ID', async () => {
    const GET_CITY = gql`
      query GetCity($id: String!) {
        getCity(id: $id) {
          id
          name
        }
      }
    `;

    // @ts-ignore
    const { data, errors } = await query({ query: GET_CITY, variables: { id: cityId } });

    errors?.[0] && console.error(errors[0].message);
    // @ts-ignore
    expect(data?.getCity.id).toEqual(cityId);
    expect(data?.getCity.id).toBeTruthy();
  });

  const CREATE_CITY = gql`
    mutation CreateCity($name: String!, $countryCode: String!) {
      createCity(data: { name: $name, countryCode: $countryCode }) {
        id
        name
      }
    }
  `;

  it('CREATE city', async () => {
    const { data, errors } = await mutate({
      mutation: CREATE_CITY,
      variables: {
        countryCode: 'ge',
        name: 'Khashuri',
      },
    });

    errors?.[0] && console.error(errors[0].message);
    newCityId = data?.createCity?.id;

    expect(!!data?.createCity).toBeTruthy();
  });

  it('CREATE city for failling on unique constraints', async () => {
    const { errors } = await mutate({
      mutation: CREATE_CITY,
      variables: {
        countryCode: 'ge',
        name: 'Khashuri',
      },
    });

    expect(errors?.[0].message).toEqual(formatMessage('KA', 'errors.uniqueConstraint'));
  });

  const UPDATE_CITY = gql`
    mutation UpdateCity($id: String!, $name: String!) {
      updateCity(data: { id: $id, name: $name }) {
        id
        name
      }
    }
  `;
  it('UPDATE City', async () => {
    const { data, errors } = await mutate({
      mutation: UPDATE_CITY,
      variables: {
        // @ts-ignore
        id: newCityId,
        name: 'Borjomi',
      },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.updateCity.name).toEqual('Borjomi');
  });

  it('DELETE City that is connected to the Address', async () => {
    const DELETE_CITY = gql`
      mutation DeleteCity($id: String!) {
        deleteCity(id: $id) {
          message
        }
      }
    `;

    const { errors } = await mutate({
      mutation: DELETE_CITY,
      // @ts-ignore
      variables: { id: cityId },
    });

    expect(errors?.[0].message).toEqual(formatMessage('KA', 'errors.relationViolation'));
  });

  it('DELETE city', async () => {
    const DELETE_CITY = gql`
      mutation DeleteCity($id: String!) {
        deleteCity(id: $id) {
          message
        }
      }
    `;

    const { data, errors } = await mutate({
      mutation: DELETE_CITY,
      // @ts-ignore
      variables: { id: newCityId },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.deleteCity?.message).toEqual(formatMessage('KA', 'common.deletedSuccessfully'));
  });

  server.stop();
});
