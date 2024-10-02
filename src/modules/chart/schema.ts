import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        getRevenue(data: filterChartData!): [RevenuePerDay!]!
        getProfit(data: filterChartData!): [ProfitPerDay!]!
        getExpensesChart(data: filterChartData!): [ExpensePerDay!]!
        getOrdersChart(data: filterChartData!): [OrderPerDay!]!
        getClientsChart(data: filterChartData!): [ClientPerDay!]!
    }

    input filterChartData {
        start: String!
        end: String!
    }

    type RevenuePerDay {
        date: String!
        revenue: Int!
    }

    type ProfitPerDay {
        date: String!
        profit: Int!
    }

    type ExpensePerDay {
        date: String!
        expense: Int!
    } 

    type OrderPerDay {
        date: String!
        order: Int!
    }

    type ClientPerDay {
        date: String!
        client: Int!
    }
`;
