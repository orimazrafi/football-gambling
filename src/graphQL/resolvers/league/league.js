import LeagueStore from "../../store/league";
export const leagueResolver = async (obj, args, req) => {
  const { leagueId } = args;
  const league = await LeagueStore.findById(leagueId);
  if (league) return LeagueStore.response(true, "league with results.", league);
  return LeagueStore.response(true, "league with results.", {});
};
