import { gql } from "apollo-server";
export const TeamInput = gql`
  input TeamInput {
    name: String!
    image: String!
    score: String
  }
`;
