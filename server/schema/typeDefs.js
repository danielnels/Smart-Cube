const { gql } = require("apollo-server-express");

const typeDefs = gql`
    

    type User {
        _id: ID
        username: String
        email: String
        password: String
        isVerified: Boolean!
       
    }

    type TokenEmailVerification {
        user: User
        token: String
        expireAt: String
    }

    type Auth {
        token: ID!
        user: User
        
    }
    type MoistureMeasurement {
        timestamp: String
        capacity: Number
        sensorName: String
    }

    type Device{
        minIrrigationIntervalInMinutes: Number
        daysInterval: Number
        startTime :  String
        irrigationTimeInSeconds:Number
        capacityBuffer:Number
        sensorName: String
        signalPin: Number
    }

    type Query {
        users: [User]!
        user(userId: ID!): User
        moistureMeasurement(aggregateKey: String!): [MoistureMeasurement]
    }
    type Mutation {
       
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        verifyEmail(email: String!, token: String!): TokenEmailVerification
        forgotPassword(email: String!): User
        updatePassword(
            email: String!
            oldPassword: String!
            newPassword: String!
        ): User
        removeUser(userId: ID!): User
       
        addEmailVerificationToken(
            userId: String!
            username: String!
            email: String!
        ): TokenEmailVerification

        updateMoistureMeasurement (
            timestamp: String!
            capacity: Number!
            sensorName: String!

        ):MoistureMeasurement

        updateDevice(
            minIrrigationIntervalInMinutes: Number!
            daysInterval: Number!
            startTime :  String!
            irrigationTimeInSeconds:Number!
            capacityBuffer:Number!
            sensorName: String!
            signalPin: Number!
        ):Device
    }
`;

module.exports = typeDefs;
