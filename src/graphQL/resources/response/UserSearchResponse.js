import { gql } from "apollo-server";
const UserSearchResponse = gql`
  type UserSearchResponse {
    success: Boolean!
  }
`;
module.exports = UserSearchResponse;
