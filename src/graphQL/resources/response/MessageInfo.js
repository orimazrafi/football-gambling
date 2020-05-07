import { gql } from "apollo-server";
export const MessageInfo = gql`
  type MessageInfo {
    sender: String!
    message: String!
    image: String!
    time: String!
  }
`;
