import { gql } from 'apollo-server-express';

export default gql`
  type SuccessMessage {
    message: String
  }

  type ResponseMessage {
    message: String
    error: String
  }

  enum LogicalOperator {
    OR
    AND
  }

  enum SortOrder {
    asc
    desc
  }

  input ConnectIdInput {
    id: String!
  }

  input LogicalStringsFilterInput {
    operator: LogicalOperator!
    key: String!
    values: [String!]
  }

  input StringFilterOperatorInput {
    equals: String
    not: String
    in: [String]
    notIn: [String]
    lt: String
    lte: String
    gt: String
    gte: String
    contains: String
    startsWith: String
    endsWith: String
  }

  input FloatFilterOperatorInput {
    equals: Float
    not: Float
    in: [Float]
    notIn: [Float]
    lt: Float
    lte: Float
    gt: Float
    gte: Float
    contains: Float
    startsWith: Float
    endsWith: Float
  }

  input IntFilterOperatorInput {
    equals: Int
    not: Int
    in: [Int]
    notIn: [Int]
    lt: Int
    lte: Int
    gt: Int
    gte: Int
    contains: Int
    startsWith: Int
    endsWith: Int
  }

  input BooleanFilterOperatorInput {
    equals: Boolean
    not: Boolean
  }

  input PaginationInput {
    offset: Int!
    limit: Int!
  }

  input CreateBasicInput {
    name: String!
  }

  input UpdateBasicInput {
    id: String!
    name: String!
  }

  input FilterBasicInput {
    id: StringFilterOperatorInput
    name: StringFilterOperatorInput
    createdAt: StringFilterOperatorInput
    updatedAt: StringFilterOperatorInput
  }

  input SortBasicInput {
    id: SortOrder
    name: SortOrder
    createdAt: SortOrder
    updatedAt: SortOrder
  }
`;
