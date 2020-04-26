const Store = require("../../store");
const leagueResolver = async (obj, args, req) => {
  const { leagueId } = args;
  const league = await Store.findOne("league", leagueId);
  if (league) return Store.leagueResponse(true, "league with results.", league);
  return Store.leagueResponse(true, "league with results.", {});
};

module.exports = leagueResolver;
