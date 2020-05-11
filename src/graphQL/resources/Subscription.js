import { gql } from "apollo-server";
const Subscription = gql`
  type Subscription {
    newMessage(groupId: ID): UserMessageResponse!
    userTyping(groupId: ID!, userId: ID!): UserTypingResponse
  }
`;
export default Subscription;
