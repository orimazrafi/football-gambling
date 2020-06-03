import { Game } from "../interfaces";
import { UseHomeTeamWins } from "../Hooks/UseHomeTeamWins";
import { UseAwayTeamWins } from "../Hooks/UseAwayTeamWins";
import { UseTieGame } from "../Hooks/UseTieGame";
import { Result } from "../interfaces";
export const useGetPointsForGAmble = () => {
  const getPointsForGamble = (leagueResult: Game, userResult: Game) => {
    let userHome = parseInt(userResult.homeTeam.score);
    let userAway = parseInt(userResult.awayTeam.score);
    let leagueHome = parseInt(leagueResult.homeTeam.score);
    let leagueAway = parseInt(leagueResult.awayTeam.score);
    let result: Result = { userHome, userAway, leagueHome, leagueAway };
    if (leagueHome === leagueAway) return UseTieGame(result);
    if (leagueHome > leagueAway) return UseHomeTeamWins(result);
    if (leagueAway > leagueHome) return UseAwayTeamWins(result);
  };
  return { getPointsForGamble };
};
