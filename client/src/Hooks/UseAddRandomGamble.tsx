import request from "graphql-request";
import { BACKEND_URL } from "../helpers";
import { ADD_RANDOM_GAMBLE } from "../mutations";
import { UserWithWinningAndScorerResult } from "../interfaces";

export const UseAddRandomGamble = (
  user: UserWithWinningAndScorerResult,
  index: number
) => {
  const { results, winningTeam, bestScorer } = user;
  const variables = {
    userId: localStorage.getItem("user_id"),
    leagueId: results._id,
    gameIndex: index,
    winningTeam,
    bestScorer,
  };
  return request(BACKEND_URL, ADD_RANDOM_GAMBLE, variables).then(
    async (data) => {
      return [data];
    }
  );
};
