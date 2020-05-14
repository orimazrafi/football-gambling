import React, { useState, useRef } from "react";
import { GroupHistory } from "../../interfaces";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { userIdFromLocalStorage } from "../../helpers";
import { useTypingMessage } from "../../Hooks/useTypingMessage";
import { useMessageSubmit } from "../../Hooks/useMessageSubmit";
import { useCreateTypingFirstSubscription } from "../../Hooks/useCreateTypingFirstSubscription";
import { useMessageSubscription } from "../../Hooks/useMessageSubscription";
import { useFetchUserGroupResults } from "../../Hooks/useFetchUserGroupResults";
import { useHandleFirstChatFetchAndNewMessage } from "../../Hooks/useHandleFirstChatFetchAndNewMessage";
import "./Chat.css";
// eslint-disable-next-line
const log = console.log;
const USER_NOT_FOUND = -1;
export const Chat = () => {
  const messagesContainer = useRef<any>(null);

  const history: GroupHistory = useHistory();
  const { groupId, users } = history?.location?.state;

  const { typingData, loadingData } = useCreateTypingFirstSubscription(groupId);
  const newMessage = useMessageSubscription(groupId);
  const { data, loadingUserData } = useFetchUserGroupResults(groupId);

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

  const isActiveUser = (name: string) => {
    const index = users.findIndex(
      (user: any) => user.name === name && user._id === userIdFromLocalStorage()
    );
    if (index === USER_NOT_FOUND) return false;
    else return true;
  };
  const [message, setMessage] = useState("");
  const { handleSubmit } = useMessageSubmit(
    scrollEvent,
    setMessage,
    groupId,
    message
  );
  const { handleChange } = useTypingMessage(setMessage, groupId);

  return (
    <>
      <div className="chat--page" ref={messagesContainer}>
        {chatMessage.map((chat: any) => (
          <div
            className={
              isActiveUser(chat.sender)
                ? "active-user chat--page__outer__wrapper"
                : "no-active-user chat--page__outer__wrapper"
            }
            key={Math.random()}
          >
            <div
              className={
                isActiveUser(chat.sender)
                  ? "active-background chat--page__inner__wrapper"
                  : "no-active-background chat--page__inner__wrapper"
              }
            >
              <div className="chat--page__inner__wrapper__sender">
                {chat.sender}
              </div>
              <div className="chat--page__inner__wrapper__img__message__wrapper">
                <img src={chat.image} alt={chat.sender} />{" "}
                <div>{chat.message}</div>
              </div>
              <div className="chat--page__inner__wrapper__time">
                {" "}
                {chat.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      {!loadingData && typingData?.userTyping?.isTyping && (
        <div>{typingData?.userTyping?.name} is typing...</div>
      )}
      <div className="chat--page__type__message__wrapper">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Message"
            id="standard-size-small"
            fullWidth
            size="small"
            onBlur={async (e) => {
              log("blur");
            }}
            value={message}
            autoFocus
            onChange={handleChange}
          />
        </form>
      </div>
    </>
  );
};
