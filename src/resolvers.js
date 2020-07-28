import jwt from "jsonwebtoken";
import { createSignedToken } from "./jwt";

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
    timeline: async (_, { limit }, { posts: { getTimeline } }) => {
      return await getTimeline(limit);
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
  },
};
