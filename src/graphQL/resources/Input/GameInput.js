import { gql } from "apollo-server";
export const GameInput = gql`
  input GameInput {
    eventDate: String
    homeTeam: TeamInput
    awayTeam: TeamInput
  }
`;
