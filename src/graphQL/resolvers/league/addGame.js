import LeagueStore from "../../store/league";

export const addGameToLeagueResolver = async (obj, args, req) => {
  const { eventDate, homeTeam, awayTeam } = args.game;
  const id = "5e9b0436ad4872327d1d4f51";
  await LeagueStore.updateGame(id, eventDate, homeTeam, awayTeam);
  return await LeagueStore.findById(id);
};
