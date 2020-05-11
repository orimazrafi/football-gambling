import LeagueStore from "../../store/league";

export const createLeagueResolver = async (obj, args, req) => {
  try {
    const { name, image, numberOfMathces } = args.league;
    const res = await LeagueStore.add(name, image, numberOfMathces);
    LeagueStore.response(true, " League was created!", res.ops[0]);
    return res.ops[0];
  } catch (err) {
    LeagueStore.response(true, err.message, {});
  }
};
