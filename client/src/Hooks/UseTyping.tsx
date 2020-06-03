import { BACKEND_URL } from "../helpers";
import request from "graphql-request";

export const UseTyping = async (groupId: string) => {
  const variables = {
    userId: localStorage.getItem("user_id") as string,
    groupId,
    isTyping: true,
  };
  return request(BACKEND_URL, USER_TYPING_PUBLISH, variables).then(
    async (data: any) => {
      return [data];
    }
  );
};

export const USER_TYPING_PUBLISH: any = `
  query userTyping($userId: ID!, $groupId: ID!,$isTyping:Boolean!) {
    userTyping(userId: $userId, groupId: $groupId,isTyping:$isTyping) {
      success
      isTyping
      name
    }
  }
`;
