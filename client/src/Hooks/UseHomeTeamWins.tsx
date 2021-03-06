import {
  bullseyeObject,
  directionObject,
  losingObject,
  WINNING_SCORE,
  DIRECTION_SCORE,
  LOSING_SCORE,
} from "../helpers";

interface Result {
  userHome: number | string;
  userAway: number | string;
  leagueHome: number | string;
  leagueAway: number | string;
  id?: string;
}

export const UseHomeTeamWins = (result: Result) => {
  if (result.userHome > result.userAway) {
    if (
      result.leagueHome === result.userHome &&
      result.leagueAway === result.userAway
    ) {
      return result.id ? bullseyeObject(result.id) : WINNING_SCORE;
    }
    return result.id ? directionObject(result.id) : DIRECTION_SCORE;
  } else {
    return result.id ? losingObject(result.id) : LOSING_SCORE;
  }
};
