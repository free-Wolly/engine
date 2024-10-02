import { gql } from 'apollo-server-express';

export default gql`
  type WorkingDayAndHour {
    id: String!
    startWeekday: Int!
    endWeekday: Int!
    startTime: String!
    endTime: String!
    createdAt: String!
    updatedAt: String!
    employee: Employee!
  }

  extend type Query {
    getWorkingDayAndHour(id: String!): WorkingDayAndHour
    getAllWorkingDaysAndHours(filters: FilterWorkingDaysAndHoursInput, sort: SortWorkingDaysAndHoursInput, pagination: PaginationInput): [WorkingDayAndHour]
  }

  extend type Mutation {
    createWorkingDayAndHour(data: CreateWorkingDayAndHourInput!): ResponseMessage
    updateWorkingDayAndHour(data: UpdateWorkingDayAndHourInput!): ResponseMessage
    deleteWorkingDayAndHour(id: String!): ResponseMessage
  }

  input CreateWorkingDayAndHourInput {
    workingDaysAndHours: [WorkingDayAndHourInput!]!
    employeeId: String!
  }

  input UpdateWorkingDayAndHourInput {
    workingDaysAndHours: [WorkingDayAndHourInput!]!
    employeeId: String!
  }

  input WorkingDayAndHourInput {
    startWeekday: Int!
    endWeekday: Int!
    startTime: String!
    endTime: String!
  }

  input FilterWorkingDaysAndHoursInput {
    id: StringFilterOperatorInput
    createdAt: StringFilterOperatorInput
    updatedAt: StringFilterOperatorInput
    startTime: StringFilterOperatorInput
    endTime: StringFilterOperatorInput
    startWeekday: IntFilterOperatorInput
    endWeekday: IntFilterOperatorInput
    employee: FilterEmployeeInput
  }

  input SortWorkingDaysAndHoursInput {
    id: SortOrder
    createdAt: SortOrder
    updatedAt: SortOrder
    startTime: SortOrder
    endTime: SortOrder
    startWeekday: SortOrder
    endWeekday: SortOrder
    employee: SortOrder
  }
`;
