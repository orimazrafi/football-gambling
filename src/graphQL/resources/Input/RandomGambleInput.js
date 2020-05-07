import { gql } from "apollo-server";
const RandomGambleInput = gql`
  input RandomGambleInput {
    userId: ID!
    leagueId: ID!
    gameIndex: Int!
    winningTeam: String
    bestScorer: String
  }
`;
module.exports = RandomGambleInput;
