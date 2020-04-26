const Store = require("../../store");
const addUserToGroupResolver = async (obj, args, req) => {
  const { userId, groupId, groupPassword } = args.userToGroup;
  //   const users = db.get().collection("users");
  let group = await Store.getAllDocuments("groups");
  let user = await Store.findSubDocument("groups", groupId, userId);
  if (user)
    return Store.groupResponse(
      false,
      "There is already user with that id in this group!",
      group
    );

  let res = await Store.findOne("groups", groupId);
  if (res.password) {
    if (res.password !== groupPassword)
      return Store.groupResponse(
        false,
        "you need to provide a valid password!",
        group
      );
  }
  await Store.updateGroup(groupId, userId);
  let league = await Store.findOne("league", res.league._id);

  let userResult = await Store.findOne("users", userId);
  //   await users.findOne({ _id: ObjectId(userId) });

  if (userResult.results._id) {
    await Store.updateUserWithOutResult(userId, groupId);
  } else {
    await Store.updateUser(userId, groupId, league);
  }

  return await Store.groupResponse(
    true,
    "user was added to the group.",
    Store.getAllDocuments("groups")
  );
};
module.exports = addUserToGroupResolver;
