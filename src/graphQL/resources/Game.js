const { gql } = require("apollo-server");

const Game = gql`
  type Game {
    eventDate: String!
    homeTeam: Team!
    awayTeam: Team!
  }
`;
module.exports = Game;
