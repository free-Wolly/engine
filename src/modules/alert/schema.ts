import { gql } from 'apollo-server-express';

export default gql`

    enum AlertType {
        ORDER
        EMERGENCY
        OTHER
    }

    type Alert {
        id: String!
        createdAt: String!
        updatedAt: String!
        seen: Boolean!
        type: AlertType!
        orderId: String!
        message: String!
    }

    extend type Query {
        getAlert(id: String!): Alert
        getAllAlerts: [Alert!]
    }

    extend type Mutation {
        createAlert(data: CreateAlertInput!): Alert
        updateAlert(data: UpdateAlertInput!): Alert
        deleteAlert(alertId: String!): Alert
    }

    input CreateAlertInput {
        message: String!
        type: AlertType!
        seen: Boolean!
        orderId: String!
    }

    input UpdateAlertInput {
        id: String!
        seen: Boolean!
    }

`;
