const { gql } = require("apollo-server");

const UserToGroupInput = gql`
  input UserToGroupInput {
    userId: ID!
    groupId: ID!
    groupPassword: String
  }
`;
module.exports = UserToGroupInput;
