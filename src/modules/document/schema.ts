import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getDocument(data: GetDocumentInput): [Document!]
  }
  extend type Mutation {
    createDocument(data: CreateDocumentInput!): Document!
  }

  input GetDocumentInput {
    orderId: String
    expensesId: String
  }

  input CreateDocumentInput {
    url: String!
    name: String
    orderId: String
    expensesId: String
  }

  type Document {
    id: String!
    createdAt: String!
    updatedAt: String!
    name: String
    url: String!
    orderId: String
    order: Order
    expensesId: String
    expenses: Expense
  }
`;
