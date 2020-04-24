import gql from "graphql-tag";

export const FETCH_USER_RESULT = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      success
      message
      user {
        results {
          _id
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
export const FETCH_LEAGUES = gql`
  query {
    leagues {
      _id
      name
    }
  }
`;
export const FETCH_GROUP = gql`
  query group($groupId: ID, $userId: ID) {
    group(groupId: $groupId, userId: $userId) {
      name
      image
      users {
        _id
        name
        image
      }
    }
  }
`;
