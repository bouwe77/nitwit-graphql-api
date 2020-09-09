import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    "Get all Users."
    users(skip: Int, limit: Int): [User]

    "Get a User by its ID."
    user(id: ID!): User

    "Get a User by its username."
    userByUsername(username: String!): User

    "Get the currently logged in user."
    me: User

    "Get the timeline of the currently logged in user."
    timeline: [Post]

    "Get the posts of a user."
    posts(userId: String!, offset: Int, skip: Int, limit: Int): [Post]

    "Get the followers of the given user."
    followers(userId: String!, skip: Int, limit: Int): [Following]

    "Get the users that the given user is following."
    following(userId: String!, skip: Int, limit: Int): [Following]
  }

  "A User is someone who is registered for the Nitwit app."
  type User {
    id: ID!
    "The username of the user."
    username: String!
    "The name of the user."
    name: String!
    "The bio of the user."
    bio: String!
    "The posts this user posted."
    posts(skip: Int, limit: Int): [Post]
    "The users that are following this user."
    following: [Following]
    "The number of users that are following this user."
    followingCount: Int!
    "The users this user is following."
    followers: [Following]
    "The number of users this user is following."
    followerCount: Int!
  }

  "A Post is a message (tweet) a user posted."
  type Post {
    id: ID!
    text: String!
    timestamp: String!
    authorUserId: String!
    author: User!
  }

  "A Following is information about who is following who."
  type Following {
    id: ID!
    user: User!
  }

  "A LoginResult is the result that is returned by a login (mutation) when it's successful."
  type LoginResult {
    "The JWT token to use for subsequent authenticated requests."
    token: String!
  }

  "The result of a follow request."
  type FollowUnfollowResult {
    success: Boolean!
  }

  "The input for creating a new post."
  input CreatePostInput {
    text: String!
  }

  type Mutation {
    "Register a new user."
    register(
      username: String!
      name: String!
      password: String!
      bio: String
    ): User!

    "Login with the given username and password."
    login(username: String!, password: String!): LoginResult!

    "Create a new post."
    createPost(data: CreatePostInput!): Post!

    "The logged in user starts following the given user."
    follow(userId: String!): FollowUnfollowResult

    "The logged in user stops following the given user."
    unfollow(userId: String!): FollowUnfollowResult
  }
`;
