const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Query {
    groups: [Group]!
    group(groupId: ID, userId: ID): Group
    users: [User]!
    leagues: [League]
    league(leagueId: ID!): League
    getUser(userId: ID!): User
  }
  type Group {
    _id: ID!
    admin: ID!
    name: String!
    limitParticipate: String!
    maxParticipate: Int
    image: String!
    password: String
    users: [User!]!
    league: League
  }
  type User {
    _id: ID!
    name: String!
    email: String!
    image: String!
    groups: [Group]
    results: League
  }
  type League {
    _id: ID!
    name: String!
    image: String!
    numberOfMathces: Int!
    games: [Game]
  }

  type Game {
    eventDate: String!
    homeTeam: Team!
    awayTeam: Team!
  }
  type Team {
    name: String!
    score: String
    logo: String!
  }
  type Mutation {
    getUserId(user: UserInput): User!
    group(groupId: ID!): Group!
    createGroup(group: GroupInput): [Group]
    addUserToGroup(userToGroup: UserToGroupInput): [Group!]!
    leaveGroup(userId: ID!, groupId: ID!): User!
    createLeague(league: LeagueInput): League!
    addGameToLeague(game: GameInput): Game!
    addGamble(gamble: GambleInput): User!
  }

  input GambleInput {
    userId: ID!
    leagueId: ID!
    results: [GameInput]
  }

  input LeagueInput {
    name: String!
    image: String!
    numberOfMathces: Int!
    games: [GameInput]
  }
  input GameInput {
    eventDate: String
    homeTeam: TeamInput
    awayTeam: TeamInput
  }
  input TeamInput {
    name: String!
    logo: String!
    score: String
  }

  input GroupInput {
    name: String!
    limitParticipate: String!
    maxParticipate: Int
    image: String!
    password: String
    admin: ID!
    league: ID!
  }
  input UserToGroupInput {
    userId: ID!
    groupId: ID!
    groupPassword: String
  }
  input UserInput {
    name: String!
    email: String!
    image: String!
  }

  type GambleUpdateResponse {
    success: Boolean!
    message: String!
    leagues: [League]!
  }
`;
module.exports = typeDefs;
