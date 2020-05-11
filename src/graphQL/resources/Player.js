import { gql } from "apollo-server";
const Player = gql`
  type Player {
    name: String!
    image: String!
    team: String!
  }
`;
export default Player;
