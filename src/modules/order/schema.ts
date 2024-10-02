import { gql } from 'apollo-server-express';

export default gql`
  enum OrderStatus {
    COMPLETED
    DISPATCHED
    IN_PROGRESS
    NEW
    RATED
    REJECTED
    CANCELLED
    SEEN
  }

  enum PaymentMethod {
    CASH
    CREDIT_CARD
  }

  enum PoolType {
    INDOOR
    OUTDOOR
  }

  enum PaymentStatus {
    PAID
    UNPAID
    PROCESSING
    DECLINED
  }

  type OrderSpecialityDetail {
    id: String!
    createdAt: String!
    updatedAt: String!
    specialityNeededId: String!
    quantityNeeded: Int!
  }

  type Order {
    id: String!
    createdAt: String!
    updatedAt: String!
    status: OrderStatus!
    comment: String
    closedAt: String
    seenByManager: Boolean!
    startTime: String!
    endTime: String!
    assignedEmployees: [Employee]
    assignedTools: [Tool]
    paymentStatus: PaymentStatus
    paymentMethod: PaymentMethod
    price: Float!
    duration: Int!
    serviceType: ServiceType
    serviceSubType: ServiceSubType
    apartmentCleaning: ApartmentCleaning
    chemicalCleaning: ChemicalCleaning
    swimmingPoolCleaning: SwimmingPoolCleaning
    maid: Maid
    cleanersQuantity: Int
    address: Address!
    client: Client!
    liveStreamRooms: String
    expense: Int
    document: [Document]
  }

  enum ServiceType {
    AFTER_RENOVATION
    GENERAL_CLEANING
    REGULAR_CLEANING
    CHEMICAL_CLEANING
    MAID
    SWIMMING_POOL_CLEANING
  }

  enum ServiceSubType {
    BASIC
    STANDART
    PREMIUM
  }

  extend type Query {
    getOrder(id: String!): Order
    getAllOrders(
      filters: FilterOrderInput
      sort: SortOrderInput
      pagination: PaginationInput
      clientId: String
    ): [Order!]
    getAllCrmOrders(
      filters: FilterOrderInput
      sort: SortOrderInput
      pagination: PaginationInput
      clientId: String
    ): [Order!]
  }

  extend type Mutation {
    createOrder(data: CreateOrderInput!): Order
    updateOrder(data: UpdateOrderInput!): Order
    updateOrderByAdmin(data: UpdateOrderInputByAdmin!): Order
    cancelOrder(id: String!): ResponseMessage
    createSimpleOrder(data: CreateSimpleOrderInput!): Order
    cancelSimpleOrder(id: String!): Order
    deleteSimpleOrder(id: String!): Order
    sendNotificationByPushToken(data: sendNotificationByPushTokenInput!): ResponseMessage
  }

  input sendNotificationByPushTokenInput {
    body: String!
    pushToken: String!
    type: String!
  }

  input ApartmentCleaningInput {
    area: Int
    balconyArea: Int
    bathroom: Int
    bedroom: Int
    cabinet: Int
    kitchen: Int
    livingRoom: Int
    studio: Int
    fridge: Boolean
    oven: Boolean
    wardrobe: Boolean
    kitchenInside: Boolean
    curtains: Int
    clothesWashing: Int
    petExists: Boolean
    premiumLiquids: Boolean
  }

  type ApartmentCleaning {
    id: String!
    createdAt: String!
    updatedAt: String!
    area: Int
    balconyArea: Int
    bathroom: Int
    bedroom: Int
    cabinet: Int
    kitchen: Int
    livingRoom: Int
    studio: Int
    fridge: Boolean
    oven: Boolean
    wardrobe: Boolean
    kitchenInside: Boolean
    curtains: Int
    clothesWashing: Int
    petExists: Boolean
    premiumLiquids: Boolean
  }

  input ChemicalCleaningInput {
    softChair: Int
    armchair: Int
    twoSeaterSofa: Int
    threeSeaterSofa: Int
    fourSeaterSofa: Int
    fiveSeaterSofa: Int
    sixSeaterSofa: Int
    mattress: Int
    carpet: Int
  }

  type ChemicalCleaning {
    id: String!
    createdAt: String!
    updatedAt: String!
    softChair: Int
    armchair: Int
    twoSeaterSofa: Int
    threeSeaterSofa: Int
    fourSeaterSofa: Int
    fiveSeaterSofa: Int
    sixSeaterSofa: Int
    mattress: Int
    carpet: Int
  }

  input SwimmingPoolCleaningInput {
    poolType: PoolType!
    squareMeter: Int!
  }

  type SwimmingPoolCleaning {
    id: String!
    createdAt: String!
    updatedAt: String!
    poolType: PoolType!
    squareMeter: Int!
  }

  input MaidInput {
    quantity: Int!
    hours: Int!
  }

  type Maid {
    id: String!
    createdAt: String!
    updatedAt: String!
    quantity: Int!
    hours: Int!
  }

  input CreateSimpleOrderInput {
    comment: String
    startTime: String!
    endTime: String!
    paymentMethod: PaymentMethod!
    paymentStatus: PaymentStatus
    price: Float!
    duration: Int!
    serviceType: ServiceType!
    serviceSubType: ServiceSubType!
    apartmentCleaning: ApartmentCleaningInput
    chemicalCleaning: ChemicalCleaningInput
    swimmingPoolCleaning: SwimmingPoolCleaningInput
    maid: MaidInput
    cleanersQuantity: Int
    addressId: String!
    clientId: String
  }

  input CreateOrderInput {
    comment: String
    startTime: String!
    endTime: String!
    # bringTools: Boolean
    paymentMethod: PaymentMethod!
    paymentStatus: PaymentStatus
    area: Int
    bathroom: Int
    bedroom: Int
    cabinet: Int
    kitchen: Int
    livingRoom: Int
    studio: Int
    price: Float!
    #products: [CreateProductInput]
    # bringCleaningProducts: Boolean
    duration: Int!
    serviceType: ServiceType
    apartmentCleaning: ApartmentCleaningInput
    assignedEmployeesIds: [String!]!
    assignedToolsIds: [String]
    addressId: String!
  }

  input UpdateOrderInput {
    id: String!
    comment: String
    startTime: String
    endTime: String
    # bringTools: Boolean
    paymentMethod: PaymentMethod
    paymentStatus: PaymentStatus
    status: OrderStatus
    seenByManager: Boolean
    area: Int
    bathroom: Int
    bedroom: Int
    cabinet: Int
    kitchen: Int
    livingRoom: Int
    studio: Int
    price: Float
    #products: [CreateProductInput]
    # bringCleaningProducts: Boolean
    duration: Int
    serviceType: ServiceType
    serviceSubType: ServiceSubType
    apartmentCleaning: ApartmentCleaningInput
    chemicalCleaning: ChemicalCleaningInput
    assignedEmployeesIds: [String]
    assignedToolsIds: [String]
    addressId: String
    liveStreamRooms: String
    expense: Int
  }

  input UpdateOrderInputByAdmin {
    clientId: String!
    orderId: String!
    comment: String
    startTime: String
    endTime: String
    # bringTools: Boolean
    paymentMethod: PaymentMethod
    paymentStatus: PaymentStatus
    # area: Int
    # bathroom: Int
    # bedroom: Int
    # cabinet: Int
    # kitchen: Int
    # livingRoom: Int
    # studio: Int
    price: Float
    #products: [CreateProductInput]
    # bringCleaningProducts: Boolean
    duration: Int
    serviceType: ServiceType
    serviceSubType: ServiceSubType
    apartmentCleaning: ApartmentCleaningInput
    chemicalCleaning: ChemicalCleaningInput
    assignedEmployeesIds: [String!]
    assignedToolsIds: [String]
    expense: Int
  }

  input FilterOrderInput {
    id: StringFilterOperatorInput
    createdAt: StringFilterOperatorInput
    updatedAt: StringFilterOperatorInput
    status: OrderStatus
    comment: StringFilterOperatorInput
    closedAt: StringFilterOperatorInput
    seenByManager: BooleanFilterOperatorInput
    startTime: StringFilterOperatorInput
    endTime: StringFilterOperatorInput
    # assignedEmployees: [Employee]
    # assignedTools: [Tool]
    # bringTools: BooleanFilterOperatorInput
    paymentStatus: PaymentStatus
    paymentMethod: PaymentMethod
    area: IntFilterOperatorInput
    bathroom: IntFilterOperatorInput
    bedroom: IntFilterOperatorInput
    cabinet: IntFilterOperatorInput
    kitchen: IntFilterOperatorInput
    livingRoom: IntFilterOperatorInput
    studio: IntFilterOperatorInput
    price: FloatFilterOperatorInput
    # products: [Product]
    # bringCleaningProducts: BooleanFilterOperatorInput
    duration: IntFilterOperatorInput
    serviceSubType: ServiceSubType
    serviceType: ServiceType
    # extraServices: [ExtraService]
    address: FilterAddressesInput
    liveStreamRooms: String
    keyword: String
    expense: Int
    priceFrom: Int
    priceTo: Int
    startTimeTo: String
    startTimeFrom: String
    createdAtTo: String
    createdAtFrom: String
  }

  input SortOrderInput {
    id: SortOrder
    createdAt: SortOrder
    updatedAt: SortOrder
    status: SortOrder
    comment: SortOrder
    closedAt: String
    seenByManager: SortOrder
    startTime: SortOrder
    endTime: SortOrder
    # assignedEmployees: [SortOrder]
    # assignedTools: [SortOrder]
    # bringTools: SortOrder
    paymentStatus: SortOrder
    paymentMethod: SortOrder
    area: SortOrder
    bathroom: SortOrder
    bedroom: SortOrder
    cabinet: SortOrder
    kitchen: SortOrder
    livingRoom: SortOrder
    studio: SortOrder
    price: SortOrder
    # products: [SortOrder]
    # bringCleaningProducts: SortOrder
    duration: SortOrder
    serviceType: SortOrder
    serviceSubType: SortOrder
    # extraServices: [SortOrder]
    address: SortOrder
    expense: SortOrder
  }
`;
