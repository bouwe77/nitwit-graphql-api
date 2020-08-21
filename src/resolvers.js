import jwt from "jsonwebtoken";
import { createSignedToken } from "./jwt";
import { async } from "validate.js";

export const resolvers = {
  Query: {
    users: async (_, { limit }, { users: { getUsers } }) => {
      return await getUsers(limit);
    },
    user: async (_, { id }, { users: { getUser } }) => {
      return await getUser(id);
    },
    me: async (_, args, { users: { getMe } }) => {
      return await getMe();
    },
    timeline: async (_, { limit }, { timeline: { getTimeline } }) => {
      return await getTimeline(limit);
    },
    posts: async (_, { userId, limit }, { posts: { getPosts } }) => {
      return await getPosts(userId, limit);
    },
    followers: async (
      _,
      { userId, limit },
      { following: { getFollowers } }
    ) => {
      return await getFollowers(userId, limit);
    },
    following: async (
      _,
      { userId, limit },
      { following: { getFollowing } }
    ) => {
      return await getFollowing(userId, limit);
    },
  },
  User: {
    posts: async (parent, { limit }, { posts: { getPosts } }) => {
      return await getPosts(parent.id, limit);
    },
  },
  Post: {
    author: async (parent, _, { users: { getUser } }) => {
      return await getUser(parent.authorUserId);
    },
  },
  Mutation: {
    register: async (_, { username, password }, { users: { createUser } }) => {
      return await createUser({ username, password });
    },
    login: async (
      _,
      { username, password },
      { users: { authenticateUser }, createSignedToken }
    ) => {
      const user = await authenticateUser(username, password);
      return { token: createSignedToken(user) };
    },
    createPost: async (_, { data: post }, { posts: { createPost } }) => {
      return await createPost(post);
    },
    follow: async (_, { data: followingUserId }, { following: { follow } }) => {
      return await follow(user, followingUserId);
    },
  },
};
