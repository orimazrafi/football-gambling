import { useEffect, useState } from "react";
import { NewMessage, GroupWithChat } from "../interfaces";
const ONE_MESSAGE = 1;
export const useHandleFirstChatFetchAndNewMessage = (
  newMessage: NewMessage,
  data: {
    group: GroupWithChat;
  },
  loadingUserData: boolean,
  scrollEvent: () => void
) => {
  const [chatMessage, setChatMessage] = useState<any>([]);

  const chatHasLoaded = () =>
    chatMessage.length < ONE_MESSAGE && !loadingUserData;
  useEffect(() => {
    if (chatHasLoaded()) {
      setChatMessage(data.group.chat);
      scrollEvent();
    }
    if (newMessage) {
      setChatMessage((prev: any) => [
        ...prev,
        newMessage.newMessage.messageInfo,
      ]);
      scrollEvent();
    }
    // eslint-disable-next-line
  }, [newMessage, data, loadingUserData]);
  return { chatMessage };
};
