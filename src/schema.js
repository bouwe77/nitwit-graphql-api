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

  "A User is someone who is registered for the Nitwit app."
  type User {
    "The name of the User."
    username: String!
  }

  "A LoginResult is the result that is returned by login when it's successful."
  type LoginResult {
    "The JWT token to use for subsequent requests."
    token: String!
  }

  type Mutation {
    "Register a new user with the given username and password."
    register(username: String!, password: String!): User!
    "Login with the given username and password."
    login(username: String!, password: String!): LoginResult!
  }
`;
