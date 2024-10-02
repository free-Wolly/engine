import { gql } from 'apollo-server-express';

export default gql`
  type DailyOrderLimit {
    id: String!
    createdAt: String!
    updatedAt: String!
    date: String!
    limit: Int!
  }

  extend type Query {
    checkOrderLimitForDay(date: String!): Boolean!
  }
`;
