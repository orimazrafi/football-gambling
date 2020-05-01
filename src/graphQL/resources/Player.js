const { gql } = require("apollo-server");

const Player = gql`
  type Player {
    name: String!
    image: String!
    team: String!
  }
`;
module.exports = Player;
