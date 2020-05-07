import { gql } from "apollo-server";
const UserInput = gql`
  input UserInput {
    name: String!
    email: String!
    image: String!
  }
`;
module.exports = UserInput;
