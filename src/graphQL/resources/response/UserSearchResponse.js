const { gql } = require("apollo-server");

const UserSearchResponse = gql`
  type UserSearchResponse {
    success: Boolean!
  }
`;
module.exports = UserSearchResponse;
