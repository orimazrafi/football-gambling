import { groupsResolver } from "../resolvers/group/groups";
import { groupResolver } from "../resolvers/group/group";
import { usersResolver } from "../resolvers/user/users";
import { leaguesResolver } from "../resolvers/league/leagues";
import { leagueResolver } from "../resolvers/league/league";
import { getUserResolver } from "../resolvers/user/getUser";
import { getUserIdResolver } from "../resolvers/user/getUserId";
import { createGroupResolver } from "../resolvers/group/create";
import { addUserToGroupResolver } from "./user/addUserToGroup";
import { deleteUserFromGroupResolver } from "./group/deleteUserFromGroup";
import { createLeagueResolver } from "../resolvers/league/create";
import { addGameToLeagueResolver } from "../resolvers/league/addGame";
import { addGambleResolver } from "../resolvers/user/addGamble";
import { userSearchResolver } from "../resolvers/user/search";
import { createUserResolver } from "../resolvers/user/create";
import { addRandomGambleResolver } from "../resolvers/user/addRandomGamble";
import { checkGroupNameExistResolver } from "../resolvers/group/checkGroupNameExist";
import { randomGambleForAllSeasonResolver } from "../resolvers/user/randomGambleForAllSeason";
import { newMessageResolver } from "../resolvers/user/newMessage";
import { userTypingResolver } from "../resolvers/user/userTyping";
import { addFirebaseMessageTokenResolver } from "./user/addFirebaseMessageToken";
import { sendFirebaseMessagesToAllUserResolver } from "../resolvers/user/sendFirebaseMessagesToAllUser";
import { withFilter } from "apollo-server";
import UserStore from "../store/user";
import LeagueStore from "../store/league";

const resolvers = {
  Query: {
    groups: groupsResolver,
    group: groupResolver,
    checkGroupNameExist: checkGroupNameExistResolver,
    users: usersResolver,
    leagues: leaguesResolver,
    league: leagueResolver,
    getUser: getUserResolver,
    getUserId: getUserIdResolver,
    search: userSearchResolver,
    userTyping: userTypingResolver,
    sendFirebaseMessagesToAllUser: sendFirebaseMessagesToAllUserResolver,
  },
  Mutation: {
    createGroup: createGroupResolver,
    addUserToGroup: addUserToGroupResolver,
    deleteUserFromGroup: deleteUserFromGroupResolver,
    createUser: createUserResolver,
    createLeague: createLeagueResolver,
    addGameToLeague: addGameToLeagueResolver,
    addGamble: addGambleResolver,
    addRandomGamble: addRandomGambleResolver,
    newMessage: newMessageResolver,
    randomGambleForAllSeason: randomGambleForAllSeasonResolver,
    addFirebaseMessageToken: addFirebaseMessageTokenResolver,
  },
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(["NEW_MESSAGE"]),
        (payload, args) => {
          return payload.newMessage.groupId === args.groupId;
        }
      ),
    },
    userTyping: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(["USER_TYPING"]),
        (payload, args) => {
          return (
            payload.userTyping.groupId === args.groupId &&
            payload.userTyping.userId !== args.userId
          );
        }
      ),
    },
  },
  Group: {
    users: async (parent) => {
      return await parent.users.map(async (user) => {
        return await UserStore.findById(user._id);
      });
    },
    league: async (parent) => await LeagueStore.findById(parent.league._id),
  },
};
module.exports = resolvers;
