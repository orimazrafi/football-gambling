import { gql } from "apollo-server";
const LeagueResponse = gql`
  type LeagueResponse {
    success: Boolean!
    message: String!
    league: League
  }
`;
module.exports = LeagueResponse;
