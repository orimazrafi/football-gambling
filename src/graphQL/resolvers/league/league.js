const Store = require("../../store");
const leagueResolver = async (obj, args, req) => {
  console.log(args);
  const { leagueId } = args;
  const league = await Store.findOne("league", leagueId);
  console.log(league);
  if (league) return Store.leagueResponse(true, "league with results.", league);
  return Store.leagueResponse(true, "league with results.", {});
};

module.exports = leagueResolver;
