const { gql } = require("apollo-server");

const GambleUpdateResponse = gql`
  type GambleUpdateResponse {
    success: Boolean!
    message: String!
    leagues: [League]!
  }
`;
module.exports = GambleUpdateResponse;
