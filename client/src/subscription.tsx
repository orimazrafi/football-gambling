import gql from "graphql-tag";

export const USER_TYPING: any = gql`
  subscription userTyping($groupId: ID!, $userId: ID!) {
    userTyping(groupId: $groupId, userId: $userId) {
      success
      isTyping
      name
    }
  }
`;

export const NEW_MESSAGE = gql`
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
