import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getOrderReview(id: String!): OrderReview
    getAllOrderReviews(id: String!): [OrderReview!]
  }

  extend type Mutation {
    createOrderReview(data: createOrderReviewInput!): OrderReview
    updateOrderReview(data: updateOrderReviewInput!): OrderReview
    deleteOrderReview(id: String!): OrderReview
  }

  input createOrderReviewInput {
    orderId: String!
    orderRating: Float!
    comment: String
  }

  input updateOrderReviewInput {
    id: String!
    orderRating: Float!
    comment: String
  }

  type OrderReview {
    id: String!
    createdAt: String!
    updatedAt: String!
    orderRating: Float
    comment: String
    orderId: String!
  }
`;
