const groupsResolver = require("../resolvers/group/groups");
const groupResolver = require("../resolvers/group/group");
const usersResolver = require("../resolvers/user/users");
const leaguesResolver = require("../resolvers/league/leagues");
const leagueResolver = require("../resolvers/league/league");
const getUserResolver = require("../resolvers/user/getUser");
const getUserIdResolver = require("../resolvers/user/getUserId");
const createGroupResolver = require("../resolvers/group/create");
const addUserToGroupResolver = require("./user/addUserToGroup");
const deleteUserFromGroupResolver = require("./group/deleteUserFromGroup");
const createLeagueResolver = require("../resolvers/league/create");
const addGameToLeagueResolver = require("../resolvers/league/addGame");
const addGambleResolver = require("../resolvers/league/addGamble");
const userSearchResolver = require("../resolvers/user/search");
const createUserResolver = require("../resolvers/user/create");
const UserStore = require("../store/user");
const LeagueStore = require("../store/league");
const resolvers = {
  Query: {
    groups: groupsResolver,
    group: groupResolver,
    users: usersResolver,
    leagues: leaguesResolver,
    league: leagueResolver,
    getUser: getUserResolver,
    getUserId: getUserIdResolver,
    search: userSearchResolver,
  },
  Mutation: {
    createGroup: createGroupResolver,
    addUserToGroup: addUserToGroupResolver,
    deleteUserFromGroup: deleteUserFromGroupResolver,
    createUser: createUserResolver,
    createLeague: createLeagueResolver,
    addGameToLeague: addGameToLeagueResolver,
    addGamble: addGambleResolver,
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
