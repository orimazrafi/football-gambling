import React, { useState, useEffect, useRef } from "react";
import { useSubscription } from "react-apollo";
import gql from "graphql-tag";
import { FETCH_USER_GROUP_LEAGUE_RESULTS } from "../../queries";
import { useQuery } from "@apollo/react-hooks";

import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import { UseTyping } from "../../Hooks/UseTyping";
import { UseStopTyping } from "../../Hooks/UseStopTyping";
import { UseNewMessage } from "../../Hooks/UseNewMessage";
import "./Chat.css";
// eslint-disable-next-line
const log = console.log;
export const Chat = () => {
  const messagesContainer = useRef<any>(null);
  interface MessageInfo {
    sender: string;
    message: string;
    image: string;
    time: string;
  }
  interface GroupHistory {
    location: {
      state: {
        groupId: string;
        chat: MessageInfo[];
        users: any;
      };
    };
  }
  interface Group {
    _id: string;
    name: string;
    image: string;
    users: any;
    chat: any;
    results: any;
    league: any;
    password: string;
    limitParticipate: string;
    maxParticipate: string;
  }
  const history: GroupHistory = useHistory();
  const { groupId, users } = history?.location?.state;

  const { data: typingData, loading: loadingData } = useSubscription(
    USER_TYPING,
    {
      variables: { groupId, userId: localStorage.getItem("user_id") as string },
    }
  );
  const { data: messageData } = useSubscription(NEW_MESSAGE, {
    variables: { groupId },
  });
  const [chatMessage, setChatMessage] = useState<any>([]);
  const {
    data,
    loading: loadingUserData,
  }: {
    data: {
      group: Group;
    };
    loading: boolean;
  } = useQuery<any, Record<string, any>>(FETCH_USER_GROUP_LEAGUE_RESULTS, {
    variables: {
      groupId,
      userId: localStorage.getItem("user_id"),
    },
  });
  const scrolEvent = () =>
    setTimeout(() => {
      messagesContainer.current.scrollTop =
        messagesContainer.current.scrollHeight;
    }, 500);

  useEffect(() => {
    if (chatMessage.length < 1 && !loadingUserData) {
      setChatMessage(data.group.chat);
      scrolEvent();
    }
    if (messageData) {
      setChatMessage((prev: any) => [
        ...prev,
        messageData.newMessage.messageInfo,
      ]);
      scrolEvent();
    }
    // eslint-disable-next-line
  }, [messageData, data, loadingUserData]);

  const isActiveUser = (name: string) => {
    const index = users.findIndex(
      (user: any) =>
        user.name === name &&
        user._id === (localStorage.getItem("user_id") as string)
    );
    if (index !== -1) return true;
    else return false;
  };
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    await UseStopTyping(groupId);
    await UseNewMessage(groupId, message);
    scrolEvent();
  };
  const handleChange = async (e: any) => {
    const { value } = e.target;
    setMessage(value);
    if (value.trim().length === 0) {
      return await UseStopTyping(groupId);
    }
    await UseTyping(groupId);
  };

  return (
    <>
      <div
        style={{
          width: "40%",
          margin: "auto",
          height: "60vh",
          overflow: "auto",
        }}
        ref={messagesContainer}
      >
        {chatMessage.map((chat: any) => (
          <div
            className={
              isActiveUser(chat.sender) ? "active-user" : "no-active-user"
            }
            key={Math.random()}
            style={{
              margin: "1em",
              display: "flex",
            }}
          >
            <div
              className={
                isActiveUser(chat.sender)
                  ? "active-background"
                  : "no-active-background"
              }
              style={{
                background: "#c79ae8",
                padding: "0.7em",
                borderRadius: "25px",
                display: "inline-block",
                maxWidth: "60%",
              }}
            >
              <div
                style={{
                  textAlign: "start",
                  fontWeight: 100,
                  fontSize: "10px",
                  margin: "-5px 0 5px 0",
                }}
              >
                {chat.sender}
              </div>
              <div style={{ display: "flex" }}>
                <img
                  src={chat.image}
                  alt={chat.sender}
                  height="20"
                  width="20"
                  style={{ borderRadius: "50%" }}
                />{" "}
                <div
                  style={{
                    margin: "0 0 0 2em",
                    fontWeight: "bold",
                    maxWidth: "80%",
                    wordBreak: "break-word",
                  }}
                >
                  {chat.message}
                </div>
              </div>
              <div
                style={{ textAlign: "end", fontWeight: 100, fontSize: "10px" }}
              >
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
      <div style={{ width: "50%", margin: "auto" }}>
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
// const USER_TYPING: any = gql`
//   subscription userTyping($groupId: ID!, $userId: ID!) {
//     userTyping(groupId: $groupId, userId: $userId) {
//       success
//       isTyping
//       name
//     }
//   }
// `;

const NEW_MESSAGE = gql`
  subscription newMessage($groupId: ID!) {
    newMessage(groupId: $groupId) {
      success
      name
      messageInfo {
        sender
        message
        image
        time
      }
    }
  }
`;
const USER_TYPING: any = gql`
  subscription userTyping($groupId: ID!, $userId: ID!) {
    userTyping(groupId: $groupId, userId: $userId) {
      success
      isTyping
      name
    }
  }
`;
