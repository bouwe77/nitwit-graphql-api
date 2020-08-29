import gql from "graphql-tag";

const GET_PROFILE = gql`
  query getProfile($username: String!) {
    userByUsername(username: $username) {
      id
      username
      followerCount
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

export { GET_PROFILE };
