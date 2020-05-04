const UserStore = require("../../store/user");
const addGambleResolver = async (obj, args, req) => {
  const { userId, leagueId, results, winningTeam, bestScorer } = args.gamble;
  await UserStore.addGamble(userId, leagueId, results, winningTeam, bestScorer);
  let res = await UserStore.findById(userId);
  return UserStore.response(true, "gamble was added", res);
};
module.exports = addGambleResolver;
