import { gql } from 'apollo-server-express';

export default gql`
  type Tool {
    id: String!
    name: String!
    description: String!
    createdAt: String!
    updatedAt: String!
    isAvailable: Boolean!
    busyTimes: [BusyTime]
    toolType: ToolType!
  }

  extend type Query {
    getTool(id: String!): Tool
    getAllTools(filters: FilterToolsInput, sort: SortToolsInput, pagination: PaginationInput): [Tool!]
  }

  extend type Mutation {
    createTool(data: CreateToolInput!): Tool
    updateTool(data: UpdateToolInput!): Tool
    deleteTool(id: String!): ResponseMessage
  }

  input CreateToolInput {
    name: String!
    description: String!
    toolType: ToolType!
    isAvailable: Boolean!
  }

  input UpdateToolInput {
    id: String!
    name: String!
    description: String!
    toolType: ToolType!
    isAvailable: Boolean!
  }

  input FilterToolsInput {
    id: StringFilterOperatorInput
    name: StringFilterOperatorInput
    description: StringFilterOperatorInput
    createdAt: StringFilterOperatorInput
    updatedAt: StringFilterOperatorInput
    isAvailable: BooleanFilterOperatorInput
    # toolType: ToolType!
    # busyTimes: [BusyTime]
  }

  input SortToolsInput {
    id: SortOrder
    createdAt: SortOrder
    updatedAt: SortOrder
    description: SortOrder
    isAvailable: SortOrder
  }
`;
