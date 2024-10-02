import { gql } from 'apollo-server-express';

export default gql`
  type BusyTime {
    id: String!
    createdAt: String!
    updatedAt: String!
    busyFrom: String!
    busyTo: String!
    employee: Employee
    tool: Tool
    unavailableFrom: String
    unavailableTo: String
    contractStartDate: String
    contractEndDate: String
    daysInMonth: Int
  }

  extend type Query {
    getBusyTime(id: String!): BusyTime
    getAllBusyTimes(
      employeeId: String
      toolId: String
      filters: FilterBusyTimeInput
      sort: SortBusyTimeInput
      pagination: PaginationInput
    ): [BusyTime]
  }

  extend type Mutation {
    createBusyTime(data: CreateBusyTimeInput!): BusyTime
    updateBusyTime(data: UpdateBusyTimeInput!): BusyTime
    deleteBusyTime(data: deleteBusyTimeInput!): ResponseMessage
  }

  input deleteBusyTimeInput {
    employeeId: String!
    orderId: String!
  }

  input CreateBusyTimeInput {
    employeeId: String
    toolId: String
    busyFrom: String
    busyTo: String
    unavailableFrom: String
    unavailableTo: String
    contractStartDate: String
    contractEndDate: String
    daysInMonth: Int
  }

  input UpdateBusyTimeInput {
    id: String!
    busyFrom: String
    busyTo: String
    unavailableFrom: String
    unavailableTo: String
    contractStartDate: String
    contractEndDate: String
    daysInMonth: Int
  }

  input FilterBusyTimeInput {
    id: StringFilterOperatorInput
    createdAt: StringFilterOperatorInput
    updatedAt: StringFilterOperatorInput
    busyFrom: StringFilterOperatorInput
    busyTo: StringFilterOperatorInput
    unavailableFrom: StringFilterOperatorInput
    unavailableTo: StringFilterOperatorInput
    contractStartDate: StringFilterOperatorInput
    contractEndDate: StringFilterOperatorInput
    daysInMonth: IntFilterOperatorInput
    employee: FilterEmployeeInput
  }

  input SortBusyTimeInput {
    id: SortOrder
    createdAt: SortOrder
    updatedAt: SortOrder
    busyFrom: SortOrder
    busyTo: SortOrder
    unavailableFrom: SortOrder
    unavailableTo: SortOrder
    contractStartDate: SortOrder
    contractEndDate: SortOrder
    daysInMonth: SortOrder
    employee: SortOrder
  }
`;
