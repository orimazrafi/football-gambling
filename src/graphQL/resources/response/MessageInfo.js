import { gql } from "apollo-server";
const MessageInfo = gql`
  type MessageInfo {
    sender: String!
    message: String!
    image: String!
    time: String!
  }
`;
export default MessageInfo;
