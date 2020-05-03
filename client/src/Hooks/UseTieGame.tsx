interface Result {
  userHome: number | string;
  userAway: number | string;
  leagueHome: number | string;
  leagueAway: number | string;
  id?: string;
}

export const UseTieGame = (result: Result) => {
  if (result.userHome === result.userAway) {
    if (result.userHome === result.leagueHome)
      return result.id ? { id: result.id, score: 3, name: "bullseye" } : 3;
    return result.id ? { id: result.id, score: 1, name: "direction" } : 1;
  }
  return result.id ? { id: result.id, score: 0, name: "none" } : 0;
};
