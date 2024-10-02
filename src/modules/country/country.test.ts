import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../schemas';
import resolvers from '../../resolvers';
import db from '../../services/db';
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

describe('Country RESOLVERS', () => {
  // @ts-ignore
  let countryCode;
  // @ts-ignore
  let newCountryCode;

  it('FETCH ALL country', async () => {
    const GET_ALL_COUNTRIES = gql`
      query GetAllCountries {
        getAllCountries {
          code
          name
        }
      }
    `;

    const { data, errors } = await query({ query: GET_ALL_COUNTRIES });
    errors?.[0] && console.error(errors[0].message);

    if (data?.getAllCountries) {
      countryCode = data?.getAllCountries[0]?.code;
    }
    expect(Array.isArray(data?.getAllCountries)).toBeTruthy();
    // @ts-ignore
    expect(countryCode).toBeTruthy();
  });

  it('FETCH country by code', async () => {
    const GET_COUNTRY = gql`
      query GetCountry($code: String!) {
        getCountry(code: $code) {
          name
          code
        }
      }
    `;

    // @ts-ignore
    const { data, errors } = await query({ query: GET_COUNTRY, variables: { code: countryCode } });

    errors?.[0] && console.error(errors[0].message);
    // @ts-ignore
    expect(data?.getCountry.code).toEqual(countryCode);
    expect(data?.getCountry.code).toBeTruthy();
  });

  const CREATE_COUNTRY = gql`
    mutation CreateCountry($code: String!, $name: String!) {
      createCountry(data: { code: $code, name: $name }) {
        code
        name
      }
    }
  `;

  it('CREATE Country', async () => {
    const { data, errors } = await mutate({
      mutation: CREATE_COUNTRY,
      variables: { name: 'Switzerland', code: 'ch' },
    });

    errors?.[0] && console.error(errors[0].message);
    newCountryCode = 'ch';
    expect(!!data?.createCountry).toBeTruthy();
  });

  const UPDATE_COUNTRY = gql`
    mutation Updatecountry($code: String!, $name: String!) {
      updateCountry(data: { code: $code, name: $name }) {
        code
        name
      }
    }
  `;

  it('UPDATE Country', async () => {
    const { data, errors } = await mutate({
      mutation: UPDATE_COUNTRY,
      variables: {
        // @ts-ignore
        code: newCountryCode,
        name: 'Swiss',
      },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.updateCountry.name).toEqual('Swiss');
  });

  // it('DELETE Country', async () => {
  //   const DELETE_COUNTRY = gql`
  //   mutation DeleteCountry($code: String!) {
  //           deleteCountry(code: $code) {
  //               message
  //           }
  //       }
  //   `

  //   const { data, errors } = await mutate({
  //     mutation: DELETE_COUNTRY,
  //     variables: { code: newCountryCode },
  //   });

  //   errors?.[0] && console.error(errors[0].message)

  //   expect(data?.deleteCountry?.message).toEqual(formatMessage('KA', 'common.deletedSuccessfully'));
  // });

  server.stop();
});
