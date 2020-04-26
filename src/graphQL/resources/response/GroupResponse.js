const { gql } = require("apollo-server");

const GroupResponse = gql`
  type GroupResponse {
    success: Boolean
    message: String
    group: [Group]
  }
`;
module.exports = GroupResponse;
