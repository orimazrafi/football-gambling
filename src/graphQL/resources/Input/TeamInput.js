const { gql } = require("apollo-server");

const TeamInput = gql`
  input TeamInput {
    name: String!
    logo: String!
    score: String
  }
`;
module.exports = TeamInput;
