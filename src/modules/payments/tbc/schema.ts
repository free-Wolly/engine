import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getTbcToken: String!
  }

  extend type Mutation {
    createPayment(data: createPaymentInput!): PaymentResponse
    callBack: String
  }

  enum StatusType {
    CREATED
    COMPLETED
    REJECTED
  }

  extend type Subscription {
    paymentStatusUpdated(paymentId: String!): String!
  }

  type PaymentResponse {
    payId: String
    status: String
    currency: String
    amount: Int
    transactionId: String
    preAuth: Boolean
    links: [Links]
    recId: String
    httpStatusCode: Int
    developerMessage: String
    userMessage: String
    orderId: String
  }

  type Links {
    uri: String
    method: String
    rel: String
  }

  input createPaymentInput {
    orderId: String!
    amount: Amount!
    returnurl: String!
    extra: String
    expirationMinutes: Int
    methods: [Int]
    callbackUrl: String
    preAuth: Boolean
    language: String
    merchantPaymentId: String
    skipInfoMessage: Boolean
    saveCard: Boolean
    saveCardToDate: String
  }

  input Amount {
    currency: String!
    total: Float
    subtotal: Float
    tax: Float
    shipping: Float
  }
`;
