import { gql } from "apollo-server";
export const UserMessageResponse = gql`
  type UserMessageResponse {
    success: Boolean!
    name: String!
    messageInfo: MessageInfo!
    groupId: ID
  }
`;
