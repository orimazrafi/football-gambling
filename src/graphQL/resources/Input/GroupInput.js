const { gql } = require("apollo-server");

const GroupInput = gql`
  input GroupInput {
    name: String!
    limitParticipate: String!
    maxParticipate: Int
    image: String!
    password: String
    admin: ID!
    league: ID!
  }
`;
module.exports = GroupInput;
