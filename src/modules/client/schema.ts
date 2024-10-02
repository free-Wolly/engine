import { gql } from 'apollo-server-express';

export default gql`
  type Client {
    id: String!
    createdAt: String!
    updatedAt: String!
    firstName: String
    lastName: String
    password: String
    email: String
    mobile: String!
    rating: Float
    verificationCode: String
    addresses: [Address!]
    isVerified: Boolean
    language: Language!
    photo: String
    smsEnabled: Boolean
    notificationsEnabled: Boolean
    deleted: Boolean
    clientReviews: [ClientReview!]
    orders: [Order!]
    birthDate: String
    pushToken: String
  }

  extend type Query {
    getClient(id: String!): Client
    getAllClients(filters: FilterClientInput, sort: SortClientInput, pagination: PaginationInput): [Client!]
  }

  extend type Mutation {
    deleteClient(id: String!): ResponseMessage
    updateClient(data: UpdateClientInput!): Client!
    createSimpleClient(input: CreateSimpleClientInput!): Client!
    updateClientPhoto(data: UpdateClientPhotoInput!): Client!
  }

  input CreateSimpleClientInput {
    firstName: String!
    lastName: String!
    email: String
    mobile: String!
    language: Language!
    birthDate: String
    cityId: String!
    street: String!
    details: String
  }

  input UpdateClientPhotoInput {
    photo: String!
  }

  input UpdateClientInput {
    id: String!
    firstName: String
    lastName: String
    email: String!
    mobile: String!
    language: Language!
    photo: String
    smsEnabled: Boolean!
    notificationsEnabled: Boolean!
    birthDate: String
    isVerified: Boolean
    pushToken: String
  }

  input FilterClientInput {
    id: StringFilterOperatorInput
    firstName: StringFilterOperatorInput
    lastName: StringFilterOperatorInput
    createdAt: StringFilterOperatorInput
    updatedAt: StringFilterOperatorInput
    mobile: StringFilterOperatorInput
    email: StringFilterOperatorInput
    rating: FloatFilterOperatorInput
    language: StringFilterOperatorInput
  }

  input SortClientInput {
    id: SortOrder
    firstName: SortOrder
    lastName: SortOrder
    createdAt: SortOrder
    updatedAt: SortOrder
    mobile: SortOrder
    email: SortOrder
    rating: SortOrder
    language: SortOrder
  }
`;
