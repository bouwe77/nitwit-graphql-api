import gql from "graphql-tag";

const GET_USER = gql`
  query getUser($username: String!) {
    userByUsername(username: $username) {
      id
      username
      followingCount
      followerCount
    }
  }
`;

export { GET_USER };
