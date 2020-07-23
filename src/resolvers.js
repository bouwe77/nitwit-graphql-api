import jwt from "jsonwebtoken";
import { createSignedToken } from "./jwt";

export const resolvers = {
  Query: {
    users: async (_, { limit }, { users: { getUsers } }) => {
      return await getUsers(limit);
    },
    user: async (_, { username }, { users: { getUser } }) => {
      return await getUser(username);
    },
    me: async (_, args, { users: { getMe } }) => {
      return await getMe();
    },
  },
  Mutation: {
    register: async (_, { username, password }, { users: { createUser } }) => {
      const createdUser = await createUser({ username, password });
      return createdUser;
    },
    login: async (
      _,
      { username, password },
      { users: { authenticateUser }, createSignedToken }
    ) => {
      const user = await authenticateUser(username, password);
      return createSignedToken(user);
    },
  },
};
