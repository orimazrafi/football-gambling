const GroupStore = require("../../store/group");
const UserStore = require("../../store/user");
const groupResolver = async (obj, args, req) => {
  const { groupId, userId } = args;
  let group = await GroupStore.findById(groupId);
  if (group) return GroupStore.response(true, "fetch group.", group);
  let user = await UserStore.findById(userId);
  if (user.groups.length > 0) {
    group = await GroupStore.findById(user.groups[0]._id);
    return GroupStore.response(true, "fetch user ifrst group.", group);
  }

  return GroupStore.response(
    false,
    "User Didn't choose any group to view neither he has group of it's own. ",
    {}
  );
};

module.exports = groupResolver;
