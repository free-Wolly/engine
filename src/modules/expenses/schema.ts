import { gql } from 'apollo-server-express';

export default gql`
extend type Query {
    getExpense(data: filterChartData): [Expense!]
}
extend type Mutation {
    createExpense(data: CreateExpenseInput!): Expense!
}

input filterExpenseData {
    start: String
    end: String
}

input CreateExpenseInput {
    amount: Float!
    description: String
    date: String!
}

type Expense {
    id: String!
    createdAt: String!
    updatedAt: String!
    amount: Float!
    description: String!
    date: String!
    documents: [Document!]
}
`;