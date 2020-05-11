import { gql } from "apollo-server";
const Group = gql`
  type Group {
    _id: ID!
    admin: ID!
    name: String!
    limitParticipate: String!
    maxParticipate: Int
    image: String!
    password: String
    users: [User!]!
    league: League
    chat: [MessageInfo]
  }
`;
export default Group;
