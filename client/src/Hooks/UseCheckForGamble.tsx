import { UseTieGame } from "./UseTieGame";
import { UseHomeTeamWins } from "./UseHomeTeamWins";
import { UseAwayTeamWins } from "./UseAwayTeamWins";
import { UserScore } from "../interfaces";

export const UseCheckForGamble = (data: any, user: any, id: string) => {
  let userScore: UserScore[] | any = [];
  user.games.forEach((u: any, index: number) => {
    let userHome = parseInt(u.homeTeam.score);
    let userAway = parseInt(u.awayTeam.score);
    let leagueHome = parseInt(data.group.league.games[index].homeTeam.score);
    let leagueAway = parseInt(data.group.league.games[index].awayTeam.score);
    let result = { id, userHome, userAway, leagueHome, leagueAway };
    if (leagueHome === leagueAway) userScore.push(UseTieGame(result));
    if (leagueHome > leagueAway) userScore.push(UseHomeTeamWins(result));
    if (leagueAway > leagueHome) userScore.push(UseAwayTeamWins(result));
  });

  return [userScore];
};
