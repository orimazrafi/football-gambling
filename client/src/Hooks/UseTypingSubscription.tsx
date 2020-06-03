import request from "graphql-request";
import { useState, useEffect } from "react";
import gql from "graphql-tag";
import { print } from "graphql/language/printer";

import { BACKEND_URL } from "../helpers";
export const UseTypingSubscription = (groupId: string) => {
  const [typingData, setTypingData] = useState<any>("");
  useEffect(() => {
    const variables = {
      groupId,
      userId: localStorage.getItem("user_id") as string,
    };
    request(BACKEND_URL, print(USER_TYPING), variables).then(
      async (data: any) => {
        setTypingData(data);
      }
    );
  }, []);
  return [typingData];
};

const USER_TYPING: any = gql`
  subscription userTyping($groupId: ID!, $userId: ID!) {
    userTyping(groupId: $groupId, userId: $userId) {
      success
      isTyping
      name
    }
  }
`;
