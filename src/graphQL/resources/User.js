import { gql } from "apollo-server";
const User = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    image: String!
    groups: [Group]
    results: League
    winningTeam: String
    bestScorer: String
  }
`;
export default User;
