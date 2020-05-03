interface Result {
  userHome: number | string;
  userAway: number | string;
  leagueHome: number | string;
  leagueAway: number | string;
  id?: string;
}
export const UseAwayTeamWins = (result: Result) => {
  if (result.userAway > result.userHome) {
    if (
      result.leagueHome === result.userHome &&
      result.leagueAway === result.userAway
    ) {
      return result.id ? { id: result.id, score: 3, name: "bullseye" } : 3;
    }
    return result.id ? { id: result.id, score: 1, name: "direction" } : 1;
  }
  return result.id ? { id: result.id, score: 0, name: "none" } : 0;
};
