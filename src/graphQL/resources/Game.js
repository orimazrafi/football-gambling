import { gql } from "apollo-server";
const Game = gql`
  type Game {
    eventDate: String!
    homeTeam: Team!
    awayTeam: Team!
  }
`;
export default Game;
