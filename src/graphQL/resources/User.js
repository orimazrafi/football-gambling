const { gql } = require("apollo-server");

const User = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    image: String!
    groups: [Group]
    results: League
  }
`;
module.exports = User;
