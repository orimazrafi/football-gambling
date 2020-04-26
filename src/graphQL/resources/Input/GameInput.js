const { gql } = require("apollo-server");

const GameInput = gql`
  input GameInput {
    eventDate: String
    homeTeam: TeamInput
    awayTeam: TeamInput
  }
`;
module.exports = GameInput;
