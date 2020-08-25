import jwt from "jsonwebtoken";
import { createSignedToken } from "./jwt";
import { async } from "validate.js";

//throw new Error("H I E R    W A S    I K    G E B L E V E N");
//TODO Following en Followers is niet heel duidelijk qua naamgeving...
//TODO Mentions met de extractMentions code
//TODO Profielfoto als externe URL

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
    following: async (parent, { limit }, { following: { getFollowing } }) => {
      return await getFollowing(parent.id, limit);
    },
    followers: async (parent, { limit }, { following: { getFollowers } }) => {
      return await getFollowers(parent.id, limit);
    },
  },
  Post: {
    author: async (parent, _, { users: { getUser } }) => {
      return await getUser(parent.authorUserId);
    },
  },
  Following: {
    user: async (parent, _, { users: { getUser } }) => {
      return await getUser(parent.userId);
    },
    followingUser: async (parent, _, { users: { getUser } }) => {
      return await getUser(parent.followingUserId);
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
    createPost: async (
      _,
      { data: post },
      { posts: { createPost }, following: { getFollowers } }
    ) => {
      return await createPost(post, getFollowers);
    },
    follow: async (
      _,
      { userId },
      {
        following: { createFollowing },
        users: { getUser, updateFollowerCount, updateFollowingCount },
      }
    ) => {
      return await createFollowing(
        userId,
        getUser,
        updateFollowerCount,
        updateFollowingCount
      );
    },
    unfollow: async (
      _,
      { userId },
      {
        following: { deleteFollowing },
        users: { getUser, updateFollowerCount, updateFollowingCount },
      }
    ) => {
      return await deleteFollowing(
        userId,
        getUser,
        updateFollowerCount,
        updateFollowingCount
      );
    },
  },
};
