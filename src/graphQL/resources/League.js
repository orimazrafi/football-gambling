const { gql } = require("apollo-server");

const League = gql`
  type League {
    _id: ID!
    name: String!
    image: String!
    numberOfMathces: Int!
    games: [Game]
    teams: [Team!]!
    players: [Player!]!
  }
`;
module.exports = League;
