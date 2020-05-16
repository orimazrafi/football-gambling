import React, { useState, useRef, useEffect } from "react";
import { GroupHistory } from "../../interfaces";
import { useHistory } from "react-router-dom";
import { useTypingMessage } from "../../Hooks/useTypingMessage";
import { useMessageSubmit } from "../../Hooks/useMessageSubmit";
import { useCreateTypingFirstSubscription } from "../../Hooks/useCreateTypingFirstSubscription";
import { useMessageSubscription } from "../../Hooks/useMessageSubscription";
import { useFetchUserGroupResults } from "../../Hooks/useFetchUserGroupResults";
import { useHandleFirstChatFetchAndNewMessage } from "../../Hooks/useHandleFirstChatFetchAndNewMessage";
import { MessagesWrapper } from "../../Components/MessagesWrapper/MessagesWrapper";
import { IsTypingWrapper } from "../../Components/IsTypingWrapper/IsTypingWrapper";
import { MessageWrapper } from "../../Components/MessageWrapper/MessageWrapper";
import "./Chat.css";
// eslint-disable-next-line
const log = console.log;
export const Chat = () => {
  const messagesContainer = useRef<any>(null);

  const history: GroupHistory | any = useHistory();
  useEffect(() => {
    const userNotInGroup = () => !history?.location?.state?.groupId;

    userNotInGroup() && history.push("not-found");
  }, [history]);
  const { typingData, loadingData } = useCreateTypingFirstSubscription(
    history?.location?.state?.groupId
  );

  const newMessage = useMessageSubscription(history?.location?.state?.groupId);
  const { data, loadingUserData } = useFetchUserGroupResults(
    history?.location?.state?.groupId
  );

  const scrollEvent = () =>
    setTimeout(() => {
      messagesContainer.current.scrollTop =
        messagesContainer.current.scrollHeight;
    }, 500);

  const { chatMessage } = useHandleFirstChatFetchAndNewMessage(
    newMessage,
    data,
    loadingUserData,
    scrollEvent
  );

  const [message, setMessage] = useState("");
  const { handleSubmit } = useMessageSubmit(
    scrollEvent,
    setMessage,
    history?.location?.state?.groupId,
    message
  );
  const handleChange = useTypingMessage(
    setMessage,
    history?.location?.state?.groupId
  );

  return (
    <>
      <MessagesWrapper
        messagesContainer={messagesContainer}
        chatMessage={chatMessage}
        users={history?.location?.state?.users}
      />
      <IsTypingWrapper loadingData={loadingData} typingData={typingData} />
      <MessageWrapper
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        message={message}
      />
    </>
  );
};
