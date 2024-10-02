import { gql } from 'apollo-server-express';

export default gql`
  enum UserRole {
    ADMIN
    MANAGER
  }

  enum UserType {
    EMPLOYEE
    USER
    CLIENT
  }

  type User {
    id: String!
    createdAt: String!
    updatedAt: String!
    firstName: String!
    lastName: String!
    password: String!
    email: String!
    mobile: String!
    role: UserRole!
    address: Address
    notificationsEnabled: Boolean!
    smsEnabled: Boolean!
    active: Boolean!
    language: Language!
    pushToken: String
  }

  extend type Query {
    getUser(id: String!): User
    getAllUsers(filters: FilterUserInput, sort: SortUserInput, pagination: PaginationInput): [User!]
  }

  extend type Mutation {
    createUser(data: CreateUserInput!): User
    updateUser(data: UpdateUserInput!, language: Language!): User
    deleteUser(id: String!): ResponseMessage
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    password: String!
    email: String!
    mobile: String!
    role: UserRole!
    active: Boolean!
    cityId: String!
    street: String!
    details: String
  }

  input UpdateUserInput {
    userId: String!
    authType: AuthType
    firstName: String!
    lastName: String!
    email: String!
    mobile: String!
    language: Language
    photo: String
    verificationCode: String
    smsEnabled: Boolean
    notificationsEnabled: Boolean
    active: Boolean!
    cityId: String!
    street: String!
    details: String
    role: UserRole!
  }

  input FilterUserInput {
    firstName: StringFilterOperatorInput!
    lastName: StringFilterOperatorInput
    email: StringFilterOperatorInput!
    mobile: StringFilterOperatorInput!
    role: StringFilterOperatorInput
  }

  input SortUserInput {
    firstName: SortOrder
    lastName: SortOrder
    email: SortOrder
    mobile: SortOrder
    role: SortOrder
  }
`;
