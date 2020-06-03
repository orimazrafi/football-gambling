import { gql } from "apollo-server";
export const UserFirebaseResponse = gql`
  type UserFirebaseResponse {
    success: Boolean!
  }
`;
