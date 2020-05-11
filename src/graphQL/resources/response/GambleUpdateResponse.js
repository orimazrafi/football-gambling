import { gql } from "apollo-server";
export const GambleUpdateResponse = gql`
  type GambleUpdateResponse {
    success: Boolean!
    message: String!
    leagues: [League]!
  }
`;
