import { gql } from "apollo-server";
export const RandomGambleInput = gql`
  input RandomGambleInput {
    userId: ID!
    leagueId: ID!
    gameIndex: Int!
    winningTeam: String
    bestScorer: String
  }
`;
