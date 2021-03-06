const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

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
    expireAt: Date
  }

  type Auth {
    token: ID!
    user: User
  }
  type MoistureMeasurement {
    timestamp: Date
    capacity: String
    sensorName: String
  }

  type Device {
    minIrrigationIntervalInMinutes: String
    daysInterval: String
    startTime: String
    irrigationTimeInSeconds: String
    capacityBuffer: String
    sensorName: String
    signalPin: String
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

    updateMoistureMeasurement(
      timestamp: Date!
      capacity: String!
      sensorName: String!
    ): MoistureMeasurement

    updateDevice(
      minIrrigationIntervalInMinutes: String!
      daysInterval: Date!
      startTime: String!
      irrigationTimeInSeconds: String!
      capacityBuffer: String!
      sensorName: String!
      signalPin: String!
    ): Device
  }
`;

module.exports = typeDefs;
