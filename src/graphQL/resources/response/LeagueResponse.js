const { gql } = require("apollo-server");

const LeagueResponse = gql`
  type LeagueResponse {
    success: Boolean!
    message: String!
    league: League
  }
`;
module.exports = LeagueResponse;
