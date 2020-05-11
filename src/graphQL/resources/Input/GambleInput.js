import { gql } from "apollo-server";
export const GambleInput = gql`
  input GambleInput {
    userId: ID!
    leagueId: ID!
    results: [GameInput]
    winningTeam: String
    bestScorer: String
  }
`;
