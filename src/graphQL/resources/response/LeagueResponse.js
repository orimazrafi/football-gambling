import { gql } from "apollo-server";
export const LeagueResponse = gql`
  type LeagueResponse {
    success: Boolean!
    message: String!
    league: League
  }
`;
