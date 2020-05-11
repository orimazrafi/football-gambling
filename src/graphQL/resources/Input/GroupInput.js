import { gql } from "apollo-server";
export const GroupInput = gql`
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
