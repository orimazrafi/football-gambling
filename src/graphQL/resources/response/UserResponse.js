import { gql } from "apollo-server";
export const UserResponse = gql`
  type UserResponse {
    success: Boolean
    message: String
    user: User
  }
`;
