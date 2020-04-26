const { gql } = require("apollo-server");

const Team = gql`
  type Team {
    name: String!
    score: String
    logo: String!
  }
`;
module.exports = Team;
