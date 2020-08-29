import gql from "graphql-tag";

const CREATE_POST = gql`
  mutation createPost($text: String!) {
    createPost(data: { text: $text }) {
      id
    }
  }
`;

export { CREATE_POST };
