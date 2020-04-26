const Store = require("../../store");
const addGambleResolver = async (obj, args, req) => {
  const { userId, leagueId, results } = args.gamble;
  await Store.addGamble(userId, leagueId, results);
  // );
  let res = await Store.findOne("users", userId);
  // await users.findOne({ _id: ObjectId(userId) });
  return {
    success: true,
    message: "gamble was added",
    user: res,
  };
};
module.exports = addGambleResolver;
