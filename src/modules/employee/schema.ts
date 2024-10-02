import { gql } from 'apollo-server-express';

export default gql`
  enum Speciality {
    GENERAL_CLEANER
    WINDOW_CLEANER
    MAID
  }

  enum Language {
    KA
    EN
    RU
  }

  type Employee {
    id: String!
    createdAt: String!
    updatedAt: String!
    email: String
    mobile: String!
    emergencyContact: String
    firstName: String!
    lastName: String!
    password: String
    speakingLanguages: [Language!]
    isAvailable: Boolean!
    busyTimes: [BusyTime!]
    workingDaysAndHours: [WorkingDayAndHour!]
    salary: Float!
    specialities: [Speciality!]!
    address: Address!
    assignedOrders: [Order!]
    photo: String
    rating: Float
    verificationCode: String
    deleted: Boolean
    isTeamLead: Boolean!
    pushToken: String
  }

  extend type Query {
    getEmployee(id: String!): Employee
    getAllEmployees(filters: FilterEmployeeInput, sort: SortEmployeeInput, pagination: PaginationInput): [Employee!]
  }

  extend type Mutation {
    createEmployee(data: CreateEmployeeInput!): Employee
    updateEmployee(data: UpdateEmployeeInput!): Employee!
    deleteEmployee(id: String!): ResponseMessage
    pickedEmployeesForSwap(data: PickedEmployeesForSwapInput!): [Employee!]
    swapEmployees(data: SwapEmployeeInput!): Order
  }

  input PickedEmployeesForSwapInput {
    employeeId: String!
    orderId: String!
  }

  input SwapEmployeeInput {
    newEmployeeId: String!
    previousEmployeeId: String!
    orderId: String!
  }

  input CreateEmployeeInput {
    firstName: String!
    lastName: String!
    email: String
    mobile: String!
    speakingLanguages: [Language!]!
    emergencyContact: String
    salary: Float!
    isAvailable: Boolean!
    cityId: String!
    street: String!
    details: String
    specialities: [Speciality!]!
    password: String
    photo: String
    rating: Float
    workingDaysAndHours: [WorkingDayAndHourInput!]!
    isTeamLead: Boolean!
  }

  input UpdateEmployeeInput {
    id: String!
    firstName: String!
    lastName: String!
    email: String
    mobile: String!
    speakingLanguages: [Language!]
    emergencyContact: String
    salary: Float!
    isAvailable: Boolean!
    specialities: [Speciality!]
    password: String
    photo: String
    rating: Float
    workingDaysAndHours: [WorkingDayAndHourInput!]
    isTeamLead: Boolean!
    street: String
    details: String
    addressId: String!
    cityId: String
  }

  input FilterEmployeeInput {
    id: StringFilterOperatorInput
    firstName: StringFilterOperatorInput
    lastName: StringFilterOperatorInput
    createdAt: StringFilterOperatorInput
    updatedAt: StringFilterOperatorInput
    mobile: StringFilterOperatorInput
    emergencyContact: StringFilterOperatorInput
    email: StringFilterOperatorInput
    clientRating: FloatFilterOperatorInput
    speakingLanguages: LogicalStringsFilterInput
    specialities: LogicalStringsFilterInput
    isAvailable: BooleanFilterOperatorInput
    country: FilterCountriesInput
    city: FilterCitiesInput
    address: StringFilterOperatorInput
    salary: FloatFilterOperatorInput
  }

  input SortEmployeeInput {
    id: SortOrder
    firstName: SortOrder
    lastName: SortOrder
    createdAt: SortOrder
    updatedAt: SortOrder
    mobile: SortOrder
    emergencyContact: SortOrder
    email: SortOrder
    clientRating: SortOrder
    isAvailable: SortOrder
    country: SortOrder
    city: SortOrder
    address: SortOrder
    salary: SortOrder
  }
`;
