const GroupStore = require("../../store/group");
const UserStore = require("../../store/user");
const LeagueStore = require("../../store/league");
const addUserToGroupResolver = async (obj, args, req) => {
  const { userId, groupId, groupPassword } = args.userToGroup;
  let group = await GroupStore.getAllGroups();
  let user = await GroupStore.findSubDocument(groupId, userId);
  if (user)
    return GroupStore.response(
      false,
      "There is already user with that id in this group!",
      group
    );

  let res = await GroupStore.findById(groupId);
  if (res.password) {
    if (res.password !== groupPassword)
      return GroupStore.response(
        false,
        "you need to provide a valid password!",
        group
      );
  }
  await GroupStore.update(groupId, userId);

  let userResult = await UserStore.findById(userId);

  if (userResult.results._id) {
    await UserStore.updateUserWithOutResult(userId, groupId);
  } else {
    await UserStore.updateUser(userId, groupId);
  }

  return await GroupStore.response(
    true,
    "user was added to the group.",
    await GroupStore.getAllGroups()
  );
};
module.exports = addUserToGroupResolver;
