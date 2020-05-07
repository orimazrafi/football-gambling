import { BACKEND_URL } from "../helpers";
import request from "graphql-request";
export const UseNewMessage = (groupId: string, message: string) => {
  const variables = {
    userId: localStorage.getItem("user_id") as string,
    groupId,
    message,
  };
  return request(BACKEND_URL, NEW_MESSAGE, variables).then(
    async (data: any) => {
      return [data];
    }
  );
};

// export const UseStopTyping = (groupId: string) => {
//   const variables = {
//     userId: localStorage.getItem("user_id") as string,
//     groupId,
//     isTyping: false,
//   };
//   return request(BACKEND_URL, NEW_MESSAGE, variables).then(
//     async (data: any) => {
//       return [data];
//     }
//   );
// };

// const USER_TYPING_PUBLISH: any = `
//   query userTyping($userId: ID!, $groupId: ID!,$isTyping:Boolean!) {
//     userTyping(userId: $userId, groupId: $groupId,isTyping:$isTyping) {
//       success
//       isTyping
//       name
//     }
//   }
// `;
const NEW_MESSAGE: any = `
mutation newMessage($userId: ID!,$message:String!,$groupId: ID!) {
    newMessage(userId: $userId, message:$message,groupId: $groupId) {
        success
             name
            messageInfo{
                sender
                message
                image
                time
             }
        }
  }
`;

// # mutation{
//     #   newMessage(userId:"5e9ab3d61d2cca2a3f403c98", message:"Hello to you all!!", groupId:"5ea535bb4b2b2cb3707345a0"){
//     #     success
//     #     name
//     #        messageInfo{
//     #       sender
//     #       message
//     #       image
//     #       time
//     #     }
//     #   }
//     # }
