import jwt from "jsonwebtoken";
import { createSignedToken } from "./jwt";
import { async } from "validate.js";

//======================================================================================
//TODO Profielfoto als externe URL?
//======================================================================================

export const resolvers = {
  Query: {
    users: async (_, { skip, limit }, { users: { getUsers } }) => {
      return await getUsers(skip, limit);
    },
    user: async (_, { id }, { users: { getUser } }) => {
      return await getUser(id);
    },
    userByUsername: async (
      _,
      { username },
      { users: { getUserByUsername } }
    ) => {
      return await getUserByUsername(username);
    },
    me: async (_, args, { users: { getMe } }) => {
      return await getMe();
    },
    timeline: async (_, { skip, limit }, { timeline: { getTimeline } }) => {
      return await getTimeline(skip, limit);
    },
    posts: async (_, { userId, skip, limit }, { posts: { getPosts } }) => {
      return await getPosts(userId, skip, limit);
    },
    followers: async (
      _,
      { userId, skip, limit },
      { following: { getFollowers } }
    ) => {
      return await getFollowers(userId, skip, limit);
    },
    following: async (
      _,
      { userId, skip, limit },
      { following: { getFollowing } }
    ) => {
      return await getFollowing(userId, skip, limit);
    },
  },
  User: {
    posts: async (parent, { skip, limit }, { posts: { getPosts } }) => {
      return await getPosts(parent.id, skip, limit);
    },
    following: async (
      parent,
      { skip, limit },
      { following: { getFollowing } }
    ) => {
      return await getFollowing(parent.id, skip, limit);
    },
    followers: async (
      parent,
      { skip, limit },
      { following: { getFollowers } }
    ) => {
      return await getFollowers(parent.id, skip, limit);
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
      {
        posts: { createPost },
        following: { getFollowers },
        users: { getUsersByUsernames },
      }
    ) => {
      return await createPost(post, getFollowers, getUsersByUsernames);
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
        users: { updateFollowerCount, updateFollowingCount },
      }
    ) => {
      return await deleteFollowing(
        userId,
        updateFollowerCount,
        updateFollowingCount
      );
    },
  },
};
