const Store = require("../../store");
const leaveGroupResolver = async (obj, args, req) => {
  const { groupId, userId } = args;
  Store.pullFromGroup(groupId);
  await Store.pullFromGroup(groupId, userId);
  await Store.pullFromUser(userId, groupId);
  return Store.findOne("users", userId);
};
module.exports = leaveGroupResolver;
