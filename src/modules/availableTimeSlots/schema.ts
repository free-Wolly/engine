import { gql } from 'apollo-server-express';

export default gql`
  enum ToolType {
    VACUUM_CLEANER
    HEAT_CLEANER
  }

  input GetSlotsInput {
    start: String!
    end: String!
    specialities: [SpecialityDetail!]!
    equipment: [ToolDetail]
    speakingLanguages: [Language!]!
  }

  input SpecialityDetail {
    speciality: Speciality!
    quantity: Int!
  }

  input ToolDetail {
    quantity: Int!
    toolType: ToolType!
  }

  type Slots {
    availableSlots: [SlotResponse]
  }
  
  type SlotResponse {
    start: String!
    employeeIds: [String!]!
    toolIds: [String!]
  }

  extend type Query {
    getSlots(data: GetSlotsInput): Slots
  }
`;
