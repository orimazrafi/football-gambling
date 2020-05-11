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
// const bullseyeObject = (id: string) => ({ id, score: 3, name: "bullseye" });
// const directionObject = (id: string) => ({ id, score: 1, name: "direction" });
// const losingObject = (id: string) => ({ id, score: 0, name: "none" });
// const WINNING_SCORE = 3;
// const DIRECTION_SCORE = 1;
// const LOSING_SCORE = 0;
export const UseAwayTeamWins = (result: Result) => {
  if (result.userAway > result.userHome) {
    if (
      result.leagueHome === result.userHome &&
      result.leagueAway === result.userAway
    ) {
      return result.id ? bullseyeObject(result.id) : WINNING_SCORE;
    }
    return result.id ? directionObject(result.id) : DIRECTION_SCORE;
  }
  return result.id ? losingObject(result.id) : LOSING_SCORE;
};
