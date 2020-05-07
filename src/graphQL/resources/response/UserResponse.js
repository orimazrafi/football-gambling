import { gql } from "apollo-server";
const UserResponse = gql`
  type UserResponse {
    success: Boolean
    message: String
    user: User
  }
`;
module.exports = UserResponse;
