import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../../schemas';
import resolvers from '../../resolvers';
import db from '../../services/db';
import formatMessage from '../../localization/intl';
import { formatError } from '../../utils';
import { PaymentMethod, PaymentStatus, ServiceType } from '@prisma/client';

describe('Order RESOLVERS', () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    context: async () => {
      const clients = await db.client.findMany();
      const userId = clients[0].id;

      return { req: { userId, me: { language: 'KA' } }, db };
    },
  });
  // @ts-ignore
  const { query, mutate } = createTestClient(server);

  // @ts-ignore
  let orderId;

  it('FETCH ALL orders', async () => {
    const GET_ALL_ORDERS = gql`
      query GetAllOrders {
        getAllOrders {
          id
          createdAt
          updatedAt
          status
          comment
          closedAt
          seenByManager
          startTime
          endTime
          assignedEmployees {
            firstName
          }
          assignedTools {
            toolType
          }
          bringTools
          paymentStatus
          paymentMethod
          area
          bathroom
          bedroom
          cabinet
          kitchen
          livingRoom
          studio
          price
          # products
          bringCleaningProducts
          duration
          serviceType
          extraServices
          petExists
          maleQuantity
          femaleQuantity
          client {
            firstName
          }
          # address {
          #   street
          # }
        }
      }
    `;

    const { data, errors } = await query({ query: GET_ALL_ORDERS });
    errors?.[0] && console.error(errors[0].message);

    expect(Array.isArray(data?.getAllOrders)).toBeTruthy();
  });

  xit('FETCH order by id', async () => {
    const GET_ORDER = gql`
      query GetOrder($id: String!) {
        getOrder(id: $id) {
          id
        }
      }
    `;
    const orders = await db.order.findMany({ take: 1 });
    orderId = orders[0].id;
    const { data, errors } = await query({ query: GET_ORDER, variables: { id: orderId } });

    errors?.[0] && console.error(errors[0].message);
    expect(data?.getOrder.id).toEqual(orderId);
    expect(data?.getOrder.id).toBeTruthy();
  });

  it('Create Order', async () => {
    const addresses = await db.address.findMany({});
    const addressId = addresses[0].id;

    const employees = await db.employee.findMany({});
    const employeeId = employees[0].id;

    const CREATE_ORDER = gql`
      mutation CreateOrder(
        $comment: String
        $startTime: String!
        $endTime: String!
        $bringTools: Boolean
        $paymentMethod: PaymentMethod!
        $paymentStatus: PaymentStatus
        $area: Int
        $bathroom: Int
        $bedroom: Int
        $cabinet: Int
        $kitchen: Int
        $livingRoom: Int
        $studio: Int
        $price: Float!
        $products: [CreateProductInput]
        $bringCleaningProducts: Boolean
        $duration: Int!
        $serviceType: ServiceType
        $extraServices: [ExtraService]
        $petExists: Boolean
        $maleQuantity: Int
        $femaleQuantity: Int
        $assignedEmployeesIds: [String!]!
        $assignedToolsIds: [String]
        $addressId: String!
      ) {
        createOrder(
          data: {
            comment: $comment
            startTime: $startTime
            endTime: $endTime
            bringTools: $bringTools
            paymentMethod: $paymentMethod
            paymentStatus: $paymentStatus
            area: $area
            bathroom: $bathroom
            bedroom: $bedroom
            cabinet: $cabinet
            kitchen: $kitchen
            livingRoom: $livingRoom
            studio: $studio
            price: $price
            products: $products
            bringCleaningProducts: $bringCleaningProducts
            duration: $duration
            serviceType: $serviceType
            extraServices: $extraServices
            petExists: $petExists
            maleQuantity: $maleQuantity
            femaleQuantity: $femaleQuantity
            assignedEmployeesIds: $assignedEmployeesIds
            assignedToolsIds: $assignedToolsIds
            addressId: $addressId
          }
        ) {
          id
        }
      }
    `;

    const { data, errors } = await mutate({
      mutation: CREATE_ORDER,
      variables: {
        comment: 'komentari',
        startTime: '2020-12-08T11:00:00.000Z',
        endTime: '2020-12-09T15:00:00.000Z',
        paymentMethod: PaymentMethod.CASH,
        paymentStatus: PaymentStatus.UNPAID,
        price: 20,
        duration: 150,
        petExists: true,
        serviceType: ServiceType.AFTER_RENOVATION,
        bedroom: 1,
        bathroom: 2,
        cabinet: 0,
        studio: 1,
        livingRoom: 2,
        kitchen: 1,
        area: 200,
        assignedEmployeesIds: [employeeId],
        addressId,
      },
    });

    errors?.[0] && console.error(errors[0].message);
    orderId = data.createOrder.id;

    expect(data?.createOrder.id).toBeTruthy();
  });

  it('Update Order', async () => {
    const UPDATE_ORDER = gql`
      mutation UpdateOrder(
        $id: String!
        $comment: String
        $startTime: String
        $endTime: String
        $bringTools: Boolean
        $paymentMethod: PaymentMethod
        $paymentStatus: PaymentStatus
        # $area: Int
        # $bathroom: Int
        # $bedroom: Int
        # $cabinet: Int
        # $kitchen: Int
        # $livingRoom: Int
        # $studio: Int
        $price: Float
        $products: [CreateProductInput]
        $bringCleaningProducts: Boolean
        $duration: Int
        $serviceType: ServiceType
        $extraServices: [ExtraService]
        $petExists: Boolean
        $maleQuantity: Int
        $femaleQuantity: Int
        $assignedEmployeesIds: [String!]
        $assignedToolsIds: [String]
      ) # $addressId: String!
      {
        updateOrder(
          data: {
            id: $id
            comment: $comment
            startTime: $startTime
            endTime: $endTime
            bringTools: $bringTools
            paymentMethod: $paymentMethod
            paymentStatus: $paymentStatus
            # area: $area
            # bathroom: $bathroom
            # bedroom: $bedroom
            # cabinet: $cabinet
            # kitchen: $kitchen
            # livingRoom: $livingRoom
            # studio: $studio
            price: $price
            products: $products
            bringCleaningProducts: $bringCleaningProducts
            duration: $duration
            serviceType: $serviceType
            extraServices: $extraServices
            petExists: $petExists
            maleQuantity: $maleQuantity
            femaleQuantity: $femaleQuantity
            assignedEmployeesIds: $assignedEmployeesIds
            assignedToolsIds: $assignedToolsIds
            # addressId: $addressId
          }
        ) {
          id
          price
        }
      }
    `;

    const { errors } = await mutate({
      mutation: UPDATE_ORDER,
      variables: {
        id: 'cklgfu0ji0021d8aempsqzpch',
        comment: 'updated',
        startTime: '2020-12-08T11:00:00.000Z',
        endTime: '2020-12-09T15:00:00.000Z',
        paymentMethod: PaymentMethod.CASH,
        paymentStatus: PaymentStatus.UNPAID,
        price: 11,
        duration: 150,
        petExists: true,
        serviceType: ServiceType.AFTER_RENOVATION,
      },
    });

    errors?.[0] && console.error(errors[0].message);
    // expect(data?.updateOrder.id).toBeTruthy();
    // expect(data?.updateOrder.price).toEqual(11);
  });

  const CANCEL_ORDER = gql`
    mutation CancelOrder($id: String!) {
      cancelOrder(id: $id) {
        message
      }
    }
  `;

  xit('Cancel Order', async () => {
    const { data, errors } = await mutate({
      mutation: CANCEL_ORDER,
      // @ts-ignore
      variables: { id: orderId },
    });

    errors?.[0] && console.error(errors[0].message);
    expect(data?.cancelOrder?.message).toEqual(formatMessage('KA', 'order.orderCancelled'));
  });
  server.stop();
});
