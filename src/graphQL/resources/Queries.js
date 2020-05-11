import { gql } from "apollo-server";
const Queries = gql`
  type Query {
    groups: [Group]!
    getUserId(user: UserInput): UserResponse!
    group(groupId: ID, userId: ID): Group
    checkGroupNameExist(name: String!): GroupResponse!
    search(email: String!): UserSearchResponse!
    users: [User]!
    leagues: [League]
    league(leagueId: ID!): LeagueResponse!
    getUser(userId: ID!): UserResponse!
    userTyping(
      userId: ID!
      groupId: ID!
      isTyping: Boolean!
    ): UserTypingResponse!
  }
`;

export default Queries;
