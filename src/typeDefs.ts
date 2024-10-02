import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar JSON

  type SuccessMessage {
    message: String
  }

  enum SortOrder {
    asc
    desc
  }

  enum Role { 
    ADMIN
    MANAGER
    USER
  }

  enum OrderStatus {
    NEW
    SEEN
    DISPATCHED
    IN_PROGRESS
    COMPLETED
    REJECTED
    RATED
  }

  enum ServiceType {
    AFTER_RENOVATION
    GENERAL_CLEANING
    REGULAR_CLEANING
    CHEMICAL_CLEANING
    MAID
    SWIMMING_POOL_CLEANING
  }

  enum LocationType {
    HOUSE
    APARTMENT
    OFFICE
  }

  enum NotificationType {
    ORDER
  }

  type Mutation {
    signup(data: UserCreateInput!): User!
    signin(data: UserSigninInput): User!
    signout: SuccessMessage
    requestPasswordReset(data: RequestPasswordResetInput): SuccessMessage!
    resetPassword(data: ResetPasswordInput): User!
    changeMyPassword(data: ChangeMyPasswordInput): SuccessMessage!
    updateMyProfile(data: ChangeMyProfileInput): User!
    createOrder(data: CreateOrderInput!): Order!
    updateOrder(data: UpdateOrderInput!): Order!
    deleteOrder(orderId: Float!): Order!
    updateUserProfile(data: UpdateUserProfileInput!): User!
    updateUserPassword(data: ChangeUserPasswordInput!): SuccessMessage!
    addProperty(data: PropertyInput!, userId: Float): Property!
    updateOrderByAdmin(data: AdminOrderUpdateInput!, userId: Float!, orderId: Float!): Order!
  }

  type Query {
    me: User!
    users(filters: UserFilterInput, sort: UserSortInput, page: PaginationInput): [User]!
  }

  input UserCreateInput {
    email: String
    mobile: Float!
    firstName: String!
    lastName: String
    password: String!
    language: String
  }

  input UserSigninInput {
    email: String!
    password: String!
  }

  input RequestPasswordResetInput {
    mobile: Float
    email: String
  }

  input ResetPasswordInput {
    verificationCode: String!
    password: String!
    confirmPassword: String!
  }

  input ChangeMyPasswordInput {
    password: String!
    confirmPassword: String!
  }

  input ChangeUserPasswordInput {
    userId: Float!
    password: String!
    confirmPassword: String!
  }

  input ChangeMyProfileInput {
    firstName: String
    lastName: String
    language: String
    email: String
    address: String
    mobile: Float
  }

  input CreateOrderInput {
    serviceType: ServiceType!
    expectedDuration: Float
    extras: OrderExtrasInput
    comment: String
    property: PropertyInput
    startTime: String!
  }

  input PropertyInput {
    locationType: LocationType!
    area: Float!
    bathrooms: Float
    address: String
    bedrooms: Float
  }

  input OrderExtrasInput {
    set: [String!]
  }

  input UpdateOrderInput {
    orderId: Float!
    startTime: String!
  }

  input UpdateUserProfileInput {
    userId: Float!
    firstName: String
    lastName: String
    address: String
    mobile: Float
    email: String
    language: String
    verified: String
  }

  input AdminOrderUpdateInput {
    total: Float
    serviceType: ServiceType
    updatedAt: String
    status: OrderStatus
    expectedDuration: Float
    extras: [String]
    comment: String
    clientId: Float
    # propertyDetails: JSON
    propertyId: Float
    startTime: String
    isChanged: Boolean
  }

  input PaginationInput {
    offset: Int!
    limit: Int!
  }

  input UserFilterInput {
    createdAt: StringFilterOperatorInput
    updatedAt: StringFilterOperatorInput
    firstName: StringFilterOperatorInput
    lastName: StringFilterOperatorInput
    role: StringFilterOperatorInput
    mobile: FloatFilterOperatorInput
    email: StringFilterOperatorInput
    language: StringFilterOperatorInput
    verified: BooleanFilterOperatorInput
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

  input BooleanFilterOperatorInput {
    equals: Boolean
    not: Boolean
  }

  input UserSortInput {
    createdAt: SortOrder
    updatedAt: SortOrder
    firstName: SortOrder
    lastName: SortOrder
    role: SortOrder
    mobile: SortOrder
    email: SortOrder
    language: SortOrder
    verified: SortOrder
  }

  type User {
    id: ID!
    createdAt: Float!
    updatedAt: String
    lastVisitied: String!
    verificationCode: String
    password: String
    pushNotification: Boolean
    sms: Boolean
    firstName: String!
    lastName: String
    role: Role!
    mobile: Float!
    email: String
    language: String!
    verified: Boolean
    address: String
    rating: Float
  }

  type Order {
    id: ID!
    total: Float!
    serviceType: ServiceType!
    createdAt: Float!
    updatedAt: String
    status: OrderStatus!
    expectedDuration: Float
    extras: [String!]
    comment: String
    clientId: Float!
    property: JSON
    startTime: String
    isChanged: Boolean!
  }

  type Property {
    id: ID!
    locationType: LocationType!
    area: Float!
    bathrooms: Float
    address: String
    bedrooms: Float
    createdAt: Float!
    ownerId: Float!
  }

  type Notification {
    id: ID!
    message: String!
    info: JSON
    createdAt: String!
    seen: Boolean!
  }
`;

export default typeDefs;
