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

describe('WorkingDayAndHour RESOLVERS', () => {
  // @ts-ignore
  let workingDayAndHourId;
  // @ts-ignore
  let newWorkingDayAndHourId;
  // @ts-ignore
  let employeeId;

  const CREATE_WORKING_DAY_AND_HOUR = gql`
    mutation CreateWorkingDayAndHour($workingDaysAndHours: [WorkingDayAndHourInput!]!, $employeeId: String!) {
      createWorkingDayAndHour(data: { workingDaysAndHours: $workingDaysAndHours, employeeId: $employeeId }) {
        message
      }
    }
  `;

  it('CREATE Working Day And Hour', async () => {
    const employees = await db.employee.findMany();
    employeeId = employees[0].id;

    const { data, errors } = await mutate({
      mutation: CREATE_WORKING_DAY_AND_HOUR,
      variables: {
        workingDaysAndHours: [
          { startWeekday: 1, endWeekday: 5, startTime: '19:00', endTime: '18:00' },
          { startWeekday: 1, endWeekday: 2, startTime: '14:00', endTime: '17:00' },
        ],
        employeeId,
      },
    });

    errors?.[0] && console.error(errors[0].message);
    expect(!!data?.createWorkingDayAndHour).toBeTruthy();
  });

  it('FETCH ALL workingDayAndHour', async () => {
    const GET_ALL_WORKING_DAY_AND_HOURS = gql`
      query GetAllWorkingDaysAndHours {
        getAllWorkingDaysAndHours {
          id
          startWeekday
          endWeekday
          startTime
          endTime
          employee {
            id
            firstName
          }
        }
      }
    `;

    const { data, errors } = await query({ query: GET_ALL_WORKING_DAY_AND_HOURS });
    errors?.[0] && console.error(errors[0].message);

    if (data?.getAllWorkingDaysAndHours) {
      workingDayAndHourId = data?.getAllWorkingDaysAndHours[0]?.id;
    }
    expect(Array.isArray(data?.getAllWorkingDaysAndHours)).toBeTruthy();
    // @ts-ignore
    expect(workingDayAndHourId).toBeTruthy();
  });

  it('FETCH Working Day and Hour by ID', async () => {
    const GET_WORKING_DAY_AND_HOUR = gql`
      query GetWorkingDayAndHour($id: String!) {
        getWorkingDayAndHour(id: $id) {
          id
          startTime
        }
      }
    `;

    // @ts-ignore
    const { data, errors } = await query({ query: GET_WORKING_DAY_AND_HOUR, variables: { id: workingDayAndHourId } });

    errors?.[0] && console.error(errors[0].message);
    // @ts-ignore
    expect(data?.getWorkingDayAndHour.id).toEqual(workingDayAndHourId);
    expect(data?.getWorkingDayAndHour.id).toBeTruthy();
  });

  const UPDATE_WORKING_DAY_AND_HOUR = gql`
    mutation UpdateWorkingDayAndHour($workingDaysAndHours: [WorkingDayAndHourInput!]!, $employeeId: String!) {
      updateWorkingDayAndHour(data: { workingDaysAndHours: $workingDaysAndHours, employeeId: $employeeId }) {
        message
      }
    }
  `;

  it('UPDATE Working Day And Hour', async () => {
    const workingDayAndHour = await db.workingDayAndHour.findMany();
    newWorkingDayAndHourId = workingDayAndHour[workingDayAndHour.length - 1]?.id;
    const { data, errors } = await mutate({
      mutation: UPDATE_WORKING_DAY_AND_HOUR,
      variables: {
        workingDaysAndHours: [
          { startWeekday: 1, endWeekday: 1, startTime: '10:00', endTime: '22:00' },
          { startWeekday: 2, endWeekday: 3, startTime: '12:00', endTime: '15:00' },
        ],
        // @ts-ignore
        employeeId,
      },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.updateWorkingDayAndHour?.message).toEqual(formatMessage('KA', 'common.updatedSuccessfully'));
  });

  it('DELETE Working Day and Hour', async () => {
    const DELETE_WORKING_DAY_AND_HOUR = gql`
      mutation DeleteWorkingDayAndHour($id: String!) {
        deleteWorkingDayAndHour(id: $id) {
          message
        }
      }
    `;

    const { data, errors } = await mutate({
      mutation: DELETE_WORKING_DAY_AND_HOUR,
      // @ts-ignore
      variables: { id: newWorkingDayAndHourId },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.deleteWorkingDayAndHour?.message).toEqual(formatMessage('KA', 'common.deletedSuccessfully'));
  });

  server.stop();
});
