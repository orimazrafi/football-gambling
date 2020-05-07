import { gql } from "apollo-server";
export const UserTypingResponse = gql`
  type UserTypingResponse {
    success: Boolean!
    isTyping: Boolean!
    name: String!
  }
`;
