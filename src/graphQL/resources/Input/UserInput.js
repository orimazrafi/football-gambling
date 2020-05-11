import { gql } from "apollo-server";
export const UserInput = gql`
  input UserInput {
    name: String!
    email: String!
    image: String!
  }
`;
