const { gql } = require("apollo-server");

const GambleInput = gql`
  input GambleInput {
    userId: ID!
    leagueId: ID!
    results: [GameInput]
    winningTeam: String
    bestScorer: String
  }
`;
module.exports = GambleInput;
