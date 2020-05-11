import { gql } from "apollo-server";
export const LeagueInput = gql`
  input LeagueInput {
    name: String!
    image: String!
    numberOfMathces: Int!
    games: [GameInput]
  }
`;
