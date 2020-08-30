import gql from "graphql-tag";

const GET_TIMELINE = gql`
  query getTimeline {
    timeline {
      id
      text
      timestamp
      author {
        username
      }
    }
  }
`;

export { GET_TIMELINE };
