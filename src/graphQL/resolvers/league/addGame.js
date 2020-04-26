const Store = require("../../store");
const addGameToLeagueResolver = async (obj, args, req) => {
  const { eventDate, homeTeam, awayTeam } = args.game;
  await Store.updateGame(
    "5e9b0436ad4872327d1d4f51",
    eventDate,
    homeTeam,
    awayTeam
  );
  return await Store.findOne("league", "5e9b0436ad4872327d1d4f51");
};
module.exports = addGameToLeagueResolver;
