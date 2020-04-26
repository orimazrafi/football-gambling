const Store = require("../../store");
const getUserResolver = async (obj, args, req) => {
  const { userId } = args;
  let res = await Store.findOne("users", userId);
  if (!res) {
    return Store.userResponse(false, "user was not found with that id.", {});
  }
  return Store.userResponse(true, "user gamble games were fetched.", res);
};

module.exports = getUserResolver;
