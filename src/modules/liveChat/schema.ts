import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getMessages(chatUUID: String, pagination: PaginationInput): MessagesResult!
    getAllChat(pagination: PaginationInput): [Chat]
    getClientLatestChatId(data: getClientLatestChatIdInput!): String
  }

  type Chat {
    id: ID!
    chatUUID: String!
    guestClientId: String
    clientId: String
    createdAt: String!
    updatedAt: String!
    firstName: String
    lastName: String
  }

  input getClientLatestChatIdInput {
    guestClientId: String
  }

  extend type Mutation {
    createMessage(data: CreateMessageInput!): Message!
  }

  input CreateMessageInput {
    text: String
    image: String
    video: String
    guestClientId: String
    chatUUID: String!
  }

  type Subscription {
    messageSent(data: SubscriptionMessageSent!): Message!
  }

  input SubscriptionMessageSent {
    chatUUID: String!
    guestClientId: String
  }

  type Message {
    id: ID!
    text: String
    image: String
    video: String
    createdAt: String!
    chatUUID: String!
    sentBySupportId: String
    sentByClientId: String
  }

  type MessagesResult {
    messages: [Message!]!
    totalCount: Int!
  }
`;
