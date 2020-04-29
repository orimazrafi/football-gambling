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
export const FETCH_LEAGUE_RESULT = gql`
  query league($leagueId: ID!) {
    league(leagueId: $leagueId) {
      success
      message
      league {
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

export const FETCH_USER_GROUP_LEAGUE_RESULTS = gql`
  query group($groupId: ID, $userId: ID) {
    group(groupId: $groupId, userId: $userId) {
      name
      image
      users {
        _id
        name
        image
        results {
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
      league {
        name
        image
        games {
          eventDate
          homeTeam {
            name
            score
          }
          awayTeam {
            name
            score
          }
        }
      }
    }
  }
`;
export const SEARCH_USER = `query search( $email: String!) {
  search( email: $email ) {
      success

  }
}`;
export const FETCH_USER = `query getUserId($name: String!, $email: String!, $image: String!) {
  getUserId(user: { name: $name, email: $email, image: $image }) {
      success
      message
      user{
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
