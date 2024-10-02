import { gql } from 'apollo-server-express';

export default gql`
  type Country {
    code: String!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getCountry(code: String!): Country
    getAllCountries(filters: FilterCountriesInput, sort: SortCountriesInput, pagination: PaginationInput): [Country!]
  }

  extend type Mutation {
    createCountry(data: CreateCountryInput!): Country
    updateCountry(data: UpdateCountryInput!): Country
    deleteCountry(code: String!): ResponseMessage
  }

  input CreateCountryInput {
    code: String!
    name: String!
  }

  input UpdateCountryInput {
    code: String!
    name: String!
  }

  input FilterCountriesInput {
    id: StringFilterOperatorInput
    name: StringFilterOperatorInput
    code: StringFilterOperatorInput
    createdAt: StringFilterOperatorInput
    updatedAt: StringFilterOperatorInput
  }

  input SortCountriesInput {
    id: SortOrder
    name: SortOrder
    code: SortOrder
    createdAt: SortOrder
    updatedAt: SortOrder
  }
`;
