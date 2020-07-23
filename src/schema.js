import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    "Get all Users."
    users(limit: Int): [User]
    "Get a User by its username."
    user(username: String!): User
    "Get the currently logged in user."
    me: User
  }

  "A User is someone who is registered for the Nitwit app"
  type User {
    "The name of the User."
    username: String!
  }

  type Mutation {
    register(username: String!, password: String!): User!
    login(username: String!, password: String!): String!
  }
`;
