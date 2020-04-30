const GroupStore = require("../../store/group");
const UserStore = require("../../store/user");
const deleteUserFromGroupResolver = async (obj, args, req) => {
  try {
    const { groupId, userId } = args;
    await GroupStore.pullFromGroup(groupId, userId);
    await UserStore.pullFromUser(userId, groupId);
    const user = UserStore.findById(userId);
    return UserStore.response(true, "user was deleted from group.", user);
  } catch (err) {
    const user = UserStore.findById(userId);
    return UserStore.response(false, err.message, user);
  }
};
module.exports = deleteUserFromGroupResolver;
