const LeagueStore = require("../../store/league");
const createLeagueResolver = async (obj, args, req) => {
  try {
    const { name, image, numberOfMathces } = args.league;
    const res = await LeagueStore.add(name, image, numberOfMathces);
    LeagueStore.response(true, " League was created!", res.ops[0]);
    return res.ops[0];
  } catch (err) {
    LeagueStore.response(true, err.message, {});
  }
};
module.exports = createLeagueResolver;
