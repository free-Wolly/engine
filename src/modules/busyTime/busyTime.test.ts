import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../schemas';
import resolvers from '../../resolvers';
import db from '../../services/db';
import formatMessage from '../../localization/intl';
import { UserRole } from '@prisma/client';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const users = await db.user.findMany({ where: { role: UserRole.ADMIN } });
    const user = users[0];

    return { req: { userId: user.id, me: { language: 'KA', role: user.role } }, db };
  },
});
// @ts-ignore
const { query, mutate } = createTestClient(server);

describe('BUSYTIME RESOLVERS', () => {
  // @ts-ignore
  let busyTimeId;
  // @ts-ignore
  let employeeNewbusyTimeId;
  // @ts-ignore
  let nonDeletableEmployeeBusyTimeId;
  // @ts-ignore
  let toolNewbusyTimeId;
  // @ts-ignore
  let employeeId;
  // @ts-ignore
  let toolId;
  let orderId;

  test('FETCH ALL busy times', async () => {
    const employees = await db.employee.findMany();
    const tools = await db.tool.findMany();
    employeeId = employees[0].id;
    toolId = tools[0].id;

    const GET_ALL_BUSY_TIMES = gql`
      query GetAllBusyTimes($employeeId: String, $toolId: String) {
        getAllBusyTimes(employeeId: $employeeId, toolId: $toolId) {
          id
          busyFrom
          busyTo
          unavailableFrom
        }
      }
    `;

    const { data, errors } = await query({ query: GET_ALL_BUSY_TIMES, variables: {} });
    errors?.[0] && console.error(errors[0].message);
    if (data?.getAllBusyTimes) {
      busyTimeId = data?.getAllBusyTimes[0]?.id;
    }
    expect(Array.isArray(data?.getAllBusyTimes)).toBeTruthy();
    expect(toolId).toBeTruthy();
    expect(employeeId).toBeTruthy();
  });

  it('FETCH busy time by ID', async () => {
    const GET_BUSY_TIME = gql`
      query GetBusyTime($id: String!) {
        getBusyTime(id: $id) {
          id
          busyFrom
          busyTo
          unavailableFrom
        }
      }
    `;

    // @ts-ignore
    const { data, errors } = await query({ query: GET_BUSY_TIME, variables: { id: busyTimeId } });

    errors?.[0] && console.error(errors[0].message);
    // @ts-ignore
    expect(data?.getBusyTime.id).toEqual(busyTimeId);
    expect(data?.getBusyTime.id).toBeTruthy();
  });

  const CREATE_BUSY_TIME = gql`
    mutation CreateBusyTime(
      $employeeId: String
      $toolId: String
      $busyFrom: String
      $busyTo: String
      $daysInMonth: Int
      $unavailableFrom: String
      $unavailableTo: String
    ) {
      createBusyTime(
        data: {
          employeeId: $employeeId
          toolId: $toolId
          busyFrom: $busyFrom
          busyTo: $busyTo
          daysInMonth: $daysInMonth
          unavailableFrom: $unavailableFrom
          unavailableTo: $unavailableTo
        }
      ) {
        id
        busyFrom
        busyTo
        unavailableFrom
      }
    }
  `;

  it('CREATE busy time for Employee', async () => {
    const { data, errors } = await mutate({
      mutation: CREATE_BUSY_TIME,
      variables: {
        // @ts-ignore
        employeeId,
        unavailableTo: '2020-12-08T11:00:00.000Z',
        unavailableFrom: '2020-12-08T11:00:00.000Z',
        busyFrom: '2020-12-08T11:00:00.000Z',
        busyTo: '2020-12-08T11:00:00.000Z',
        daysInMonth: 10,
      },
    });

    errors?.[0] && console.error(errors[0].message);
    employeeNewbusyTimeId = data?.createBusyTime?.id;
    expect(!!data?.createBusyTime).toBeTruthy();
  });

  it('CREATE busy time for Tool', async () => {
    const { data, errors } = await mutate({
      mutation: CREATE_BUSY_TIME,
      variables: {
        // @ts-ignore
        toolId,
        unavailableTo: '2020-12-08T11:00:00.000Z',
        unavailableFrom: '2020-12-08T11:00:00.000Z',
        busyFrom: '2020-12-08T11:00:00.000Z',
        busyTo: '2020-12-08T11:00:00.000Z',
        daysInMonth: 10,
      },
    });

    errors?.[0] && console.error(errors[0].message);
    toolNewbusyTimeId = data?.createBusyTime?.id;
    expect(!!data?.createBusyTime).toBeTruthy();
  });

  it('CREATE busy time without Employee or Tool ID', async () => {
    const { errors } = await mutate({
      mutation: CREATE_BUSY_TIME,
      variables: {
        unavailableTo: '2020-12-08T11:00:00.000Z',
        unavailableFrom: '2020-12-08T11:00:00.000Z',
        busyFrom: '2020-12-08T11:00:00.000Z',
        busyTo: '2020-12-08T11:00:00.000Z',
        daysInMonth: 10,
      },
    });

    expect(errors?.[0]?.message).toEqual(formatMessage('KA', 'busyTime.missingId'));
  });

  const UPDATE_BUSY_TIME = gql`
    mutation UpdateBusyTime(
      $id: String!
      $busyFrom: String
      $busyTo: String
      $daysInMonth: Int
      $unavailableFrom: String
      $unavailableTo: String
    ) {
      updateBusyTime(
        data: {
          id: $id
          busyFrom: $busyFrom
          busyTo: $busyTo
          daysInMonth: $daysInMonth
          unavailableFrom: $unavailableFrom
          unavailableTo: $unavailableTo
        }
      ) {
        id
        busyFrom
        busyTo
        unavailableFrom
        daysInMonth
      }
    }
  `;
  it('UPDATE Employee busy time', async () => {
    const { data, errors } = await mutate({
      mutation: UPDATE_BUSY_TIME,
      variables: {
        // @ts-ignore
        id: employeeNewbusyTimeId,
        unavailableTo: '2020-11-08T11:00:00.000Z',
        unavailableFrom: '2020-12-08T11:00:00.000Z',
        busyFrom: '2020-12-08T11:00:00.000Z',
        busyTo: '2020-12-08T11:00:00.000Z',
        daysInMonth: 3,
      },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.updateBusyTime.daysInMonth).toEqual(3);
  });

  it('UPDATE Employee busy time', async () => {
    const { data, errors } = await mutate({
      mutation: UPDATE_BUSY_TIME,
      variables: {
        // @ts-ignore
        id: toolNewbusyTimeId,
        unavailableTo: '2020-11-08T11:00:00.000Z',
        unavailableFrom: '2020-12-08T11:00:00.000Z',
        busyFrom: '2020-12-08T11:00:00.000Z',
        busyTo: '2020-12-08T11:00:00.000Z',
        daysInMonth: 3,
      },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.updateBusyTime.daysInMonth).toEqual(3);
  });

  it('UPDATE busy time that is used in progress order', async () => {
    const addresses = await db.address.findMany();
    const addressId = addresses[0].id;
    const clients = await db.client.findMany();
    const userId = clients[0].id;

    const today = new Date();
    today.setHours(today.getHours() + 8);

    const order = await db.order.create({
      data: {
        status: 'NEW',
        duration: 20,
        paymentMethod: 'CASH',
        paymentStatus: 'UNPAID',
        serviceType: 'AFTER_RENOVATION',
        price: 200,
        startTime: new Date(),
        endTime: today,
        client: { connect: { id: userId } },
        address: {
          connect: { id: addressId },
        },
        assignedEmployees: {
          // @ts-ignore
          connect: { id: employeeId },
        },
      },
    });
    orderId = order.id;

    const busyTime = await db.busyTime.create({
      data: {
        busyFrom: new Date(),
        busyTo: today,
        assignedOrderId: orderId,
        employee: {
          connect: {
            // @ts-ignore
            id: employeeId,
          },
        },
      },
    });

    nonDeletableEmployeeBusyTimeId = busyTime.id;
    const { errors } = await mutate({
      mutation: UPDATE_BUSY_TIME,
      variables: { id: nonDeletableEmployeeBusyTimeId, street: 'Abashidze Str.', latitude: 20, city: 'Telavi' },
    });

    expect(errors?.[0]?.message).toEqual(formatMessage('KA', 'busyTime.canNotUpdate'));
  });

  it('UPDATE busy time with wrong id', async () => {
    const { errors } = await mutate({
      mutation: UPDATE_BUSY_TIME,
      variables: { id: 'wrongId', daysInMonth: 12 },
    });

    expect(errors?.[0]?.message).toEqual(formatMessage('KA', 'errors.recordToUpdateNotFound'));
  });

  it('DELETE employee busy time', async () => {
    const DELETE_BUSY_TIME = gql`
      mutation DeleteBusyTime($id: String!) {
        deleteBusyTime(id: $id) {
          message
        }
      }
    `;

    const { data, errors } = await mutate({
      mutation: DELETE_BUSY_TIME,
      // @ts-ignore
      variables: { id: employeeNewbusyTimeId },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.deleteBusyTime?.message).toEqual(formatMessage('KA', 'common.deletedSuccessfully'));
  });

  it('DELETE employee busy time that is connected to in progress order', async () => {
    const DELETE_BUSY_TIME = gql`
      mutation DeleteBusyTime($id: String!) {
        deleteBusyTime(id: $id) {
          message
        }
      }
    `;

    const { errors } = await mutate({
      mutation: DELETE_BUSY_TIME,
      // @ts-ignore
      variables: { id: nonDeletableEmployeeBusyTimeId },
    });

    expect(errors?.[0]?.message).toEqual(formatMessage('KA', 'busyTime.canNotDelete'));

    // @ts-ignore
    await db.busyTime.delete({ where: { id: nonDeletableEmployeeBusyTimeId } });
  });

  it('DELETE tool busy time', async () => {
    const DELETE_BUSY_TIME = gql`
      mutation DeleteBusyTime($id: String!) {
        deleteBusyTime(id: $id) {
          message
        }
      }
    `;

    const { data, errors } = await mutate({
      mutation: DELETE_BUSY_TIME,
      // @ts-ignore
      variables: { id: toolNewbusyTimeId },
    });

    errors?.[0] && console.error(errors[0].message);

    expect(data?.deleteBusyTime?.message).toEqual(formatMessage('KA', 'common.deletedSuccessfully'));
  });

  server.stop();
});
