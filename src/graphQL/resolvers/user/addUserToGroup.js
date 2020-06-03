import GroupStore from "../../store/group";
import UserStore from "../../store/user";
// import LeagueStore from "../../store/league";
const MONKEY_ID = "5e9ab80b36d4382cd60e29db";

export const addUserToGroupResolver = async (obj, args, req) => {
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

  if (res.results) {
    await UserStore.updateUserWithOutResult(userId, groupId);
  } else {
    let monkey = await UserStore.findById(MONKEY_ID);
    await UserStore.updateUser(userId, groupId, monkey);
  }

  return await GroupStore.response(
    true,
    "user was added to the group.",
    await GroupStore.getAllGroups()
  );
};
module.exports = addUserToGroupResolver;
