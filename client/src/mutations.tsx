import gql from "graphql-tag";
export const ADD_GAMBLE = gql`
  mutation addGamble($userId: ID!, $leagueId: ID!, $results: [GameInput]) {
    addGamble(
      gamble: { userId: $userId, leagueId: $leagueId, results: $results }
    ) {
      success
      message
      user {
        results {
          name
          image
          numberOfMathces
          games {
            eventDate
            homeTeam {
              name
              score
              logo
            }
            awayTeam {
              name
              score
              logo
            }
          }
        }
      }
    }
  }
`;
export const CREATE_GROUP = `
mutation createGroup(
  $name: String!
  $password: String
  $limitParticipate: String!
  $maxParticipate: Int!
  $admin: ID!
  $image: String!
  $league: ID!
) {
  createGroup(
    group: {
      name: $name
      password: $password
      limitParticipate: $limitParticipate
      maxParticipate: $maxParticipate
      admin: $admin
      image: $image
      league: $league
    }
  ) {
    message
    success
    group {
      _id
      admin
      name
      maxParticipate
      image
      password
      users {
        _id
        name
      }
    }
  }
}
`;
export const FETCH_USER = `mutation getUserId($name: String!, $email: String!, $image: String!) {
    getUserId(user: { name: $name, email: $email, image: $image }) {
        success
        message
        user {
            _id
            name
            image
            email
            groups{
                _id
            }
            results{
                _id
            }
             }

    }
  }`;
