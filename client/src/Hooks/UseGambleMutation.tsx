import request from "graphql-request";
import { BACKEND_URL } from "../helpers";
import { ADD_GAMBL } from "../mutations";

export const UseGambleMutation = (user: any) => {
  const variables = {
    userId: localStorage.getItem("user_id") as string,
    leagueId: user.results._id,
    results: user.results.games,
    winningTeam: user.winningTeam,
    bestScorer: user.bestScorer,
  };
  return request(BACKEND_URL, ADD_GAMBL, variables).then(async (data: any) => {
    return [data];
  });
};
