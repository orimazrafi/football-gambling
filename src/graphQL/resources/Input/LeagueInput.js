import { gql } from "apollo-server";
const LeagueInput = gql`
  input LeagueInput {
    name: String!
    image: String!
    numberOfMathces: Int!
    games: [GameInput]
  }
`;
module.exports = LeagueInput;
