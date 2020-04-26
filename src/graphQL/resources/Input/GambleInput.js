const { gql } = require("apollo-server");

const GambleInput = gql`
  input GambleInput {
    userId: ID!
    leagueId: ID!
    results: [GameInput]
  }
`;
module.exports = GambleInput;
