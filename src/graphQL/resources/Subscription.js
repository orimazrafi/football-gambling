import { gql } from "apollo-server";
export const Subscription = gql`
  type Subscription {
    newMessage(groupId: ID): UserMessageResponse!
    userTyping(groupId: ID!, userId: ID!): UserTypingResponse
  }
`;
