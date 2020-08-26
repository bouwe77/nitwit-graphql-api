import gql from "graphql-tag";

const GET_TIMELINE = gql`
  query getTimeline {
    timeline {
      id
      text
      author {
        username
      }
    }
  }
`;

export { GET_TIMELINE };
