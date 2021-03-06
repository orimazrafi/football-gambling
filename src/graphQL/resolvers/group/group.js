import GroupStore from "../../store/group";
import UserStore from "../../store/user";
export const groupResolver = async (obj, args, req) => {
  const { groupId, userId } = args;
  let group = await GroupStore.findById(groupId);
  if (groupId) return group;
  let user = await UserStore.findById(userId);
  if (user.groups.length > 0) {
    return await GroupStore.findById(user.groups[0]._id);
  }
};
