const { gql } = require("apollo-server");

const Queries = gql`
  # This type specifies the entry points into our API.s
  type Query {
    groups: [Group]!
    getUserId(user: UserInput): UserResponse!
    group(groupId: ID, userId: ID): Group
    search(email: String!): UserSearchResponse!
    users: [User]!
    leagues: [League]
    league(leagueId: ID!): LeagueResponse!
    getUser(userId: ID!): UserResponse!
  }
`;

module.exports = Queries;