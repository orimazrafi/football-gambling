const { gql } = require("apollo-server");

const Mutations = gql`
  # The mutation root type, used to define all mutations.
  type Mutation {
    # getUserId(user: UserInput): UserResponse!
    group(groupId: ID!): Group!
    createGroup(group: GroupInput): GroupResponse!
    createUser(user: UserInput): UserResponse!
    addUserToGroup(userToGroup: UserToGroupInput): GroupResponse!
    leaveGroup(userId: ID!, groupId: ID!): User!
    createLeague(league: LeagueInput): League!
    addGameToLeague(game: GameInput): Game!
    addGamble(gamble: GambleInput): UserResponse!
  }
`;

module.exports = Mutations;
