import { gql } from 'apollo-server-express';

export default gql`
  type ApolloCity {
    id: String!
    name: String!
    createdAt: String!
    updatedAt: String!
    country: Country!
    countryCode: String!
  }

  extend type Query {
    getCity(id: String!): ApolloCity
    getAllCities(filters: FilterCitiesInput, sort: SortCitiesInput, pagination: PaginationInput): [ApolloCity!]
  }

  extend type Mutation {
    createCity(data: CreateCityInput!): ApolloCity
    updateCity(data: UpdateCityInput!): ApolloCity
    deleteCity(id: String!): ResponseMessage
  }

  input CreateCityInput {
    name: String!
    countryCode: String!
  }

  input UpdateCityInput {
    id: String!
    name: String!
    countryCode: String!
  }

  input FilterCitiesInput {
    id: StringFilterOperatorInput
    name: StringFilterOperatorInput
    country: FilterCountriesInput
    createdAt: StringFilterOperatorInput
    updatedAt: StringFilterOperatorInput
  }

  input SortCitiesInput {
    id: SortOrder
    createdAt: SortOrder
    updatedAt: SortOrder
    name: SortOrder
    contry: SortOrder
  }
`;
