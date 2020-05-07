const UserStore = require("../../store/user");
export const userTypingResolver = async (_, args, { pubsub }) => {
  const { userId, groupId, isTyping } = args;
  const user = await UserStore.findById(userId);

  pubsub.publish("USER_TYPING", {
    userTyping: { success: true, name: user.name, isTyping, groupId, userId },
  });
  return { success: true, name: user.name, isTyping };
};
