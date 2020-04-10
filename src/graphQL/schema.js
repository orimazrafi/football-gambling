const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Query {
    groups: [Group]!
    group: Group
    groupById(groupId: ID!): Group
    users: [User]!
    user: User
  }
  type Group {
    _id: ID!
    admin: ID!
    name: String!
    maxParticipante: Int
    image: String!
    password: String
    users: [User!]!
    league: [Leauge]
  }
  type User {
    _id: ID!
    name: String!
    image: String!
    groups: [Group]
  }
  type Leauge {
    id: ID!
    league: String!
    dates: String!
    numberOfMathces: Int!
    results: [Result]
  }
  type Result {
    userId: ID!
    homeTeam: Int
    awayTeam: Int
  }
  type Mutation {
    createGroup(group: GroupInput): Group
    createUser(user: UserInput): User!
    addUserToGroup(userId: ID!, groupId: ID!): User!
    addGamble(
      userId: ID!
      leagueId: ID!
      results: [ResultInput]
    ): GambleUpdateResponse
  }
  input GroupInput {
    name: String!
    maxParticipante: Int
    image: String!
    password: String
    admin: ID!
  }
  input UserInput {
    name: String!
    image: String!
  }
  input ResultInput {
    homeTeam: Int
    awayTeam: Int
  }

  type GambleUpdateResponse {
    success: Boolean!
    message: String!
    leagues: [Leauge]!
  }
`;
module.exports = typeDefs;
