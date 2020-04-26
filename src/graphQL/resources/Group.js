const { gql } = require("apollo-server");

const Group = gql`
  type Group {
    _id: ID!
    admin: ID!
    name: String!
    limitParticipate: String!
    maxParticipate: Int
    image: String!
    password: String
    users: [User!]!
    league: League
  }
`;
module.exports = Group;
