import { gql } from 'apollo-server-express';

export default gql`
  type Address {
    id: String!
    createdAt: String!
    updatedAt: String!
    client: Client
    employee: Employee
    user: User
    latitude: Float
    longitude: Float
    street: String!
    city: ApolloCity!
    cityId: String!
    details: String
    entrance: String
    floor: String
    apartment: String
    deleted: Boolean
  }

  extend type Query {
    getAddress(id: String!): Address
    getAllAddresses(filters: FilterAddressesInput, sort: SortAddressesInput, pagination: PaginationInput): [Address]
  }

  extend type Mutation {
    createAddress(data: CreateAddressInput!): Address
    createAddressByAdmin(data: CreateAddressByAdminInput!): Address
    updateAddress(data: UpdateAddressInput!): Address
    deleteAddress(id: String!): ResponseMessage
  }

  input CreateAddressInput {
    cityId: String!
    street: String!
    details: String
    latitude: Float
    longitude: Float
    entrance: String
    floor: String
    apartment: String
  }

  input CreateAddressByAdminInput {
    cityId: String!
    street: String!
    details: String
    latitude: Float
    longitude: Float
    entrance: String
    floor: String
    apartment: String
    clientId: String!
  }

  input UpdateAddressInput {
    id: String!
    cityId: String
    street: String
    details: String
    latitude: Float
    longitude: Float
    entrance: String
    floor: String
    apartment: String
  }

  input FilterAddressesInput {
    id: StringFilterOperatorInput
    createdAt: StringFilterOperatorInput
    updatedAt: StringFilterOperatorInput
    city: StringFilterOperatorInput
    details: StringFilterOperatorInput
    street: StringFilterOperatorInput
    longitude: FloatFilterOperatorInput
    latitude: FloatFilterOperatorInput
  }

  input SortAddressesInput {
    id: SortOrder
    createdAt: SortOrder
    updatedAt: SortOrder
    city: SortOrder
    latitude: SortOrder
    longitude: SortOrder
    details: SortOrder
    street: SortOrder
  }
`;
