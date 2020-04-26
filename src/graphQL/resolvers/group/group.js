const Store = require("../../store");
const groupResolver = async (obj, args, req) => {
  const { groupId, userId } = args;
  if (groupId) return await Store.findOne("groups", args.groupId);
  let user = await Store.findOne("users", userId);
  if (user.groups.length > 0) {
    return await Store.findOne("groups", user.groups[0]._id);
  }
  return {
    message:
      "User Didn't choose any group to view neither he has group of it's own. ",
  };
};

module.exports = groupResolver;
