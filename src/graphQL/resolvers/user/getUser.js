const UserStore = require("../../store/user");
const LeagueStore = require("../../store/league");
const getUserResolver = async (obj, args, req) => {
  const { userId } = args;
  let res = await UserStore.findById(userId);
  let league = await LeagueStore.findById(res.results._id);
  if (!res) {
    return UserStore.response(false, "user was not found with that id.", {});
  }
  return UserStore.response(true, "user gamble games were fetched.", res);
};

module.exports = getUserResolver;
