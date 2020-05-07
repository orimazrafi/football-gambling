const UserStore = require("../../store/user");

const getUserResolver = async (_, args, { pubsub }) => {
  const { userId } = args;
  let res = await UserStore.findById(userId);
  pubsub.publish("NEW_MESSAGE", { newMessage: "user" });
  if (!res) {
    return UserStore.response(false, "user was not found with that id.", {});
  }
  return UserStore.response(true, "user gamble games were fetched.", res);
};

module.exports = getUserResolver;
