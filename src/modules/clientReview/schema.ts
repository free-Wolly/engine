import { gql } from 'apollo-server-express';

export default gql`
  type ClientReview {
    id: String!
    createdAt: String!
    updatedAt: String!
    rating: Float!
    comment: String
    order: Order
  }

  extend type Query {
    getClientReview(id: String!): ClientReview
    getClientAllReviews(
      clientId: String!
      filters: FilterClientReviewsInput
      sort: SortClientReviewsInput
      pagination: PaginationInput
    ): [ClientReview]
  }

  extend type Mutation {
    createClientReview(data: CreateClientReviewInput!): ClientReview
    updateClientReview(data: UpdateClientReviewInput!): ClientReview
    deleteClientReview(id: String!): ResponseMessage
  }

  input CreateClientReviewInput {
    rating: Float!
    comment: String
    orderId: String!
  }

  input UpdateClientReviewInput {
    id: String!
    rating: Float
    comment: String
  }

  input FilterClientReviewsInput {
    id: StringFilterOperatorInput
    createdAt: StringFilterOperatorInput
    updatedAt: StringFilterOperatorInput
    rating: FloatFilterOperatorInput
    comment: StringFilterOperatorInput
    order: FilterOrderInput
  }

  input SortClientReviewsInput {
    id: SortOrder
    rating: SortOrder
    comment: SortOrder
    order: SortOrder
    createdAt: SortOrder
    updatedAt: SortOrder
  }
`;
