import GroupStore from "../../store/group";
import UserStore from "../../store/user";
export const deleteUserFromGroupResolver = async (obj, args, req) => {
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
