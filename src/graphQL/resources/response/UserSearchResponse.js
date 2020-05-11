import { gql } from "apollo-server";
export const UserSearchResponse = gql`
  type UserSearchResponse {
    success: Boolean!
  }
`;
