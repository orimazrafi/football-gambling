const UserStore = require("../../store/user");
const log = console.log;
const randomGambleForAllSeasonResolver = async (obj, args, req) => {
  let { userId, leagueId } = args;
  let user = await UserStore.findById(userId);
  user.results.games.forEach((game) => {
    game.homeTeam.score = UserStore.getRandomIndex(4).toString();
    game.awayTeam.score = UserStore.getRandomIndex(4).toString();
  });

  let bestScorer =
    user.results.players[UserStore.getRandomIndex(user.results.players.length)]
      .name;

  let winningTeam =
    user.results.teams[UserStore.getRandomIndex(user.results.teams.length)]
      .name;

  await UserStore.addGamble(
    userId,
    leagueId,
    user.results.games,
    winningTeam,
    bestScorer
  );
  let res = await UserStore.findById(userId);
  return UserStore.response(true, `random gamble was added!`, res);
};
module.exports = randomGambleForAllSeasonResolver;
