import request from "graphql-request";
import { BACKEND_URL } from "../helpers";
import { ADD_RANDOM_GAMBLE } from "../mutations";
export const UseAddRandomGamble = (user: any, index: number) => {
  const variables = {
    userId: localStorage.getItem("user_id"),
    leagueId: user.results._id,
    gameIndex: index,
    winningTeam: user.winningTeam,
    bestScorer: user.bestScorer,
  };
  return request(BACKEND_URL, ADD_RANDOM_GAMBLE, variables).then(
    async (data) => {
      return [data];
    }
  );
};
