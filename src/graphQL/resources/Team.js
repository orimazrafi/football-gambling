import { gql } from "apollo-server";
const Team = gql`
  type Team {
    name: String!
    score: String
    image: String!
  }
`;
module.exports = Team;
