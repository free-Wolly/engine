import { gql } from 'apollo-server-express';

export default gql`
  type Product {
    id: String!
    name: String!
    description: String
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getProduct(id: String!): Product
    getAllProducts(filters: FilterProductsInput, sort: SortBasicInput, pagination: PaginationInput): [Product]
  }

  extend type Mutation {
    createProduct(data: CreateProductInput!): Product
    updateProduct(data: UpdateProductInput!): Product
    deleteProduct(id: String!): Product
  }

  input CreateProductInput {
    name: String!
    description: String
  }
  
  input UpdateProductInput {
    id: String!
    name: String!
    description: String
  }

  input FilterProductsInput {
    id: StringFilterOperatorInput
    name: StringFilterOperatorInput
    createdAt: StringFilterOperatorInput
    updatedAt: StringFilterOperatorInput
  }
`;
