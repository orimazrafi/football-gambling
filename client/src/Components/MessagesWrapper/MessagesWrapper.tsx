import React from "react";
import { userIdFromLocalStorage } from "../../helpers";
interface Props {
  messagesContainer: any;
  chatMessage: any;
  users: any;
}
const USER_NOT_FOUND = -1;

export const MessagesWrapper = (props: Props) => {
  const { messagesContainer, chatMessage, users } = props;
  const isActiveUser = (name: string) => {
    const index = users.findIndex(
      (user: any) => user.name === name && user._id === userIdFromLocalStorage()
    );
    if (index === USER_NOT_FOUND) return false;
    else return true;
  };
  return (
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
            <div className="chat--page__inner__wrapper__time"> {chat.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
