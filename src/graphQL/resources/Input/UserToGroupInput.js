import { gql } from "apollo-server";
export const UserToGroupInput = gql`
  input UserToGroupInput {
    userId: ID!
    groupId: ID!
    groupPassword: String
  }
`;
