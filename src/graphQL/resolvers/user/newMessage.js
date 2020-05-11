import UserStore from "../../store/user";
import moment from "moment";
import GroupStore from "../../store/group";
export const newMessageResolver = async (_, args, { pubsub }) => {
  const { userId, groupId, message } = args;
  const user = await UserStore.findById(userId);
  const messageInfo = {
    sender: user.name,
    message,
    image: user.image,
    time: moment().format("h:mm a"),
  };
  GroupStore.addMessage(groupId, messageInfo);
  pubsub.publish("NEW_MESSAGE", {
    newMessage: {
      name: user.name,
      messageInfo,
      success: true,
      groupId,
    },
  });
  return { success: true, name: user.name, messageInfo };
};
