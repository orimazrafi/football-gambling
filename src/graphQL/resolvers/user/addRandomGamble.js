import UserStore from "../../store/user";
export const addRandomGambleResolver = async (obj, args, req) => {
  let {
    userId,
    leagueId,
    gameIndex,
    winningTeam,
    bestScorer,
  } = args.randomGamble;
  let user = await UserStore.findById(userId);
  user.results.games[gameIndex].homeTeam.score = UserStore.getRandomIndex(
    4
  ).toString();
  user.results.games[gameIndex].awayTeam.score = UserStore.getRandomIndex(
    4
  ).toString();

  bestScorer =
    !user.bestScorer && !bestScorer
      ? user.results.players[
          UserStore.getRandomIndex(user.results.players.length)
        ].name
      : user.bestScorer;

  winningTeam =
    !user.winningTeam && !winningTeam
      ? user.results.teams[UserStore.getRandomIndex(user.results.teams.length)]
          .name
      : user.winningTeam;

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
