import gql from "graphql-tag";
export const ADD_GAMBLE = gql`
  mutation addGamble(
    $userId: ID!
    $leagueId: ID!
    $results: [GameInput]
    $winningTeam: String
    $bestScorer: String
  ) {
    addGamble(
      gamble: {
        userId: $userId
        leagueId: $leagueId
        results: $results
        winningTeam: $winningTeam
        bestScorer: $bestScorer
      }
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
              image
            }
            awayTeam {
              name
              score
              image
            }
          }
        }
        winningTeam
        bestScorer
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
export const CREATE_USER = `mutation createUser($name: String!, $email: String!, $image: String!) {
  createUser(user: { name: $name, email: $email, image: $image }) {
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
export const ADD_USER_TO_GROUP = `
  mutation addUserToGroup($userId: ID!, $groupId: ID!, $groupPassword: String) {
    addUserToGroup(
      userToGroup: {
        userId: $userId
        groupId: $groupId
        groupPassword: $groupPassword
      }
    ) {
      success
      message
      group{
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
