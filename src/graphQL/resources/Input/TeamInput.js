import { gql } from "apollo-server";
const TeamInput = gql`
  input TeamInput {
    name: String!
    image: String!
    score: String
  }
`;
module.exports = TeamInput;
