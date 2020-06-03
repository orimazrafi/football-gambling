import { useEffect } from "react";
const ONE_MESSAGE = 1;

export const useOnLoadMessagesAndGetNewMessages = (
  data: any,
  chatMessage: any,
  loadingUserData: any,
  setChatMessage: any,
  newMessage: any,
  scrolEvent: any
) => {
  const chatHasLoaded = () =>
    chatMessage?.length < ONE_MESSAGE && !loadingUserData;
  useEffect(() => {
    if (chatHasLoaded()) {
      setChatMessage(data.group.chat);
      scrolEvent();
    }
    if (newMessage) {
      setChatMessage((prev: any) => [
        ...prev,
        newMessage.newMessage.messageInfo,
      ]);
      scrolEvent();
    }
    // eslint-disable-next-line
  }, [newMessage, data, loadingUserData]);
};
