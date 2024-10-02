import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../schemas';
import resolvers from '../../resolvers';
import db from '../../services/db';
import formatMessage from '../../localization/intl';
import { formatError } from '../../utils';
import { Language, Speciality, UserRole } from '@prisma/client';

describe('Employee RESOLVERS', () => {
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
  let employeeId;
  const randomString = Math.random().toString(36).substring(7);
  const randomNumber = `50${Math.random().toString().slice(2, 9)}`;

  it('Create Employee', async () => {
    const CREATE_EMPLOYEE = gql`
      mutation CreateEmployee(
        $firstName: String!
        $lastName: String!
        $email: String!
        $mobile: String!
        $password: String!
        $specialities: [Speciality!]!
        $speakingLanguages: [Language!]!
        $emergencyContact: String!
        $salary: Float!
        $isAvailable: Boolean!
        $photo: String
      ) {
        createEmployee(
          data: {
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
            mobile: $mobile
            specialities: $specialities
            speakingLanguages: $speakingLanguages
            emergencyContact: $emergencyContact
            salary: $salary
            isAvailable: $isAvailable
            photo: $photo
          }
        ) {
          id
          mobile
          firstName
        }
      }
    `;

    const { data, errors } = await mutate({
      mutation: CREATE_EMPLOYEE,
      variables: {
        firstName: 'Willwww',
        lastName: 'Smith123',
        email: `${randomString}@gmail2111.com`,
        mobile: randomNumber,
        speakingLanguages: [Language.EN],
        password: 'Chalagashvili1@',
        specialities: [Speciality.MAID],
        emergencyContact: '595123450',
        salary: 200,
        isAvailable: false,
        photo:
          'https://imaaages.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
    });

    errors?.[0] && console.error(errors[0].message);
    employeeId = data.createEmployee.id;

    expect(data?.createEmployee.firstName).toEqual('Willwww');
  });

  it('FETCH ALL employees', async () => {
    const GET_ALL_EMPLOYEES = gql`
      query GetAllEmployees {
        getAllEmployees {
          id
          firstName
        }
      }
    `;

    const { data, errors } = await query({ query: GET_ALL_EMPLOYEES });
    errors?.[0] && console.error(errors[0].message);

    expect(Array.isArray(data?.getAllEmployees)).toBeTruthy();
  });

  it('FETCH employee by id', async () => {
    const GET_EMPLOYEE = gql`
      query GetEmployee($id: String!) {
        getEmployee(id: $id) {
          id
        }
      }
    `;

    // @ts-ignore
    const { data, errors } = await query({ query: GET_EMPLOYEE, variables: { id: employeeId } });

    errors?.[0] && console.error(errors[0].message);
    // @ts-ignore
    expect(data?.getEmployee.id).toEqual(employeeId);
    expect(data?.getEmployee.id).toBeTruthy();
  });

  it('Update Employee', async () => {
    const UPDATE_EMPLOYEE = gql`
      mutation UpdateEmployee(
        $id: String!
        $firstName: String
        $lastName: String
        $email: String
        $mobile: String
        $password: String
        $specialities: [Speciality!]
        $speakingLanguages: [Language!]
        $emergencyContact: String
        $salary: Float
        $isAvailable: Boolean
        $photo: String
      ) {
        updateEmployee(
          data: {
            id: $id
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
            mobile: $mobile
            specialities: $specialities
            speakingLanguages: $speakingLanguages
            emergencyContact: $emergencyContact
            salary: $salary
            isAvailable: $isAvailable
            photo: $photo
          }
        ) {
          id
          mobile
          firstName
          lastName
        }
      }
    `;

    const { data, errors } = await mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: {
        // @ts-ignore
        id: employeeId,
        firstName: 'Johnson',
        lastName: 'Smith1222213',
        speakingLanguages: [Language.EN],
        password: 'Chalagashvili1@',
        specialities: [Speciality.MAID],
        emergencyContact: '595123450',
        salary: 200,
        isAvailable: false,
        photo:
          'https://imaaages.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
    });

    errors?.[0] && console.error(errors[0].message);
    expect(data?.updateEmployee.firstName).toEqual('Johnson');
    expect(data?.updateEmployee.lastName).toEqual('Smith1222213');
  });

  const DELETE_EMPLOYEE = gql`
    mutation DeleteEmployee($id: String!) {
      deleteEmployee(id: $id) {
        message
      }
    }
  `;
  xit('Delete Employee', async () => {
    const { data, errors } = await mutate({
      //@TODO disconnect address to delete employee
      mutation: DELETE_EMPLOYEE,
      variables: {
        // @ts-ignore
        id: employeeId,
      },
    });

    errors?.[0] && console.error(errors[0].message);
    expect(data?.deleteEmployee?.message).toEqual(formatMessage('KA', 'common.deletedSuccessfully'));
  });
  server.stop();
});
