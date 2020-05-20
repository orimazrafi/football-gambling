import { gql } from "apollo-server";
const Mutations = gql`
  type Mutation {
    group(groupId: ID!): GroupResponse!
    createGroup(group: GroupInput): GroupResponse!
    createUser(user: UserInput): UserResponse!
    addUserToGroup(userToGroup: UserToGroupInput): GroupResponse!
    deleteUserFromGroup(userId: ID!, groupId: ID!): UserResponse!
    createLeague(league: LeagueInput): LeagueResponse!
    addGameToLeague(game: GameInput): Game!
    addGamble(gamble: GambleInput): UserResponse!
    addRandomGamble(randomGamble: RandomGambleInput): UserResponse!
    randomGambleForAllSeason(userId: ID!, leagueId: ID!): UserResponse!
    newMessage(
      userId: ID!
      message: String!
      groupId: ID!
    ): UserMessageResponse!
    addFirebaseMessageToken(token: String!, userId: ID!): UserFirebaseResponse!
  }
`;
export default Mutations;
