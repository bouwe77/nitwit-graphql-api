import gql from "graphql-tag";

const GET_PROFILE = gql`
  query getProfile($username: String!) {
    userByUsername(username: $username) {
      id
      username
      followerCount
      followers {
        user {
          id
        }
      }
      followingCount
      posts {
        id
        text
        timestamp
        author {
          username
        }
      }
    }
  }
`;

const GET_FOLLOWING = gql`
  query getFollowing($userId: String!) {
    following(userId: $userId) {
      user {
        id
        username
      }
    }
  }
`;

const GET_FOLLOWERS = gql`
  query getFollowers($userId: String!) {
    followers(userId: $userId) {
      user {
        id
        username
      }
    }
  }
`;

const FOLLOW = gql`
  mutation follow($userId: String!) {
    follow(userId: $userId) {
      success
    }
  }
`;

const UNFOLLOW = gql`
  mutation unfollow($userId: String!) {
    unfollow(userId: $userId) {
      success
    }
  }
`;

export { GET_PROFILE, GET_FOLLOWING, GET_FOLLOWERS, FOLLOW, UNFOLLOW };
