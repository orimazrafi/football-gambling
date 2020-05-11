import { gql } from "apollo-server";
export const GroupResponse = gql`
  type GroupResponse {
    success: Boolean
    message: String
    group: [Group]
  }
`;
