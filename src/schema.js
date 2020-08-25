import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    "Get all Users."
    users(limit: Int): [User]

    "Get a User by its ID."
    user(id: ID): User

    "Get the currently logged in user."
    me: User

    "Get the timeline of the currently logged in user."
    timeline: [Post]

    "Get the posts of a user."
    posts(userId: String!, limit: Int): [Post]

    "Get the followers of the given user."
    followers(userId: String!, limit: Int): [Following]

    "Get the users that the given user is following."
    following(userId: String!, limit: Int): [Following]
  }

  "A User is someone who is registered for the Nitwit app."
  type User {
    id: ID!
    "The name of the User."
    username: String!
    posts: [Post]
    following: [Following]
    followingCount: Int!
    followers: [Following]
    followerCount: Int!
  }

  "A Post is a message (tweet) a user posted."
  type Post {
    id: ID!
    text: String!
    authorUserId: String!
    author: User!
  }

  "A Following is information about who is following who."
  type Following {
    id: ID!
    "The user where this following information is about."
    user: User!
    "The user that is being followed."
    followingUser: User!
  }

  "A LoginResult is the result that is returned by a login when it's successful."
  type LoginResult {
    "The JWT token to use for subsequent authenticated requests."
    token: String!
  }

  "The input for creating a new post."
  input CreatePostInput {
    text: String!
  }

  type Mutation {
    "Register a new user with the given username and password."
    register(username: String!, password: String!): User!

    "Login with the given username and password."
    login(username: String!, password: String!): LoginResult!

    "Create a new post."
    createPost(data: CreatePostInput!): Post!

    "The logged in user starts following the given user."
    follow(userId: String!): Following
  }
`;
