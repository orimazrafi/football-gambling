const groupsResolver = require("../resolvers/group/groups");
const groupResolver = require("../resolvers/group/group");
const usersResolver = require("../resolvers/user/users");
const leaguesResolver = require("../resolvers/league/leagues");
const leagueResolver = require("../resolvers/league/league");
const getUserResolver = require("../resolvers/user/getUser");
const getUserIdResolver = require("../resolvers/user/getUserId");
const createGroupResolver = require("../resolvers/group/create");
const addUserToGroupResolver = require("../resolvers/group/addUser");
const leaveGroupResolver = require("../resolvers/group/leave");
const createLeagueResolver = require("../resolvers/league/create");
const addGameToLeagueResolver = require("../resolvers/league/addGame");
const addGambleResolver = require("../resolvers/league/addGamble");
const userSearchResolver = require("../resolvers/user/search");
const createUserResolver = require("../resolvers/user/create");
const Store = require("../store/index");
const log = console.log;
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
    leaveGroup: leaveGroupResolver,
    createUser: createUserResolver,
    createLeague: createLeagueResolver,
    addGameToLeague: addGameToLeagueResolver,
    addGamble: addGambleResolver,
  },
  Group: {
    users: async (parent) => {
      return await parent.users.map(async (user) => {
        return await Store.findOne("users", user._id);
      });
    },
    league: async (parent) => await Store.findOne("league", parent.league._id),
  },
};
module.exports = resolvers;
