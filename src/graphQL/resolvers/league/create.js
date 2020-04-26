const Store = require("../../store");
const createLeagueResolver = async (obj, args, req) => {
  const { name, image, numberOfMathces } = args.league;
  const res = await Store.addLeague(name, image, numberOfMathces);
  return res.ops[0];
};
module.exports = createLeagueResolver;
