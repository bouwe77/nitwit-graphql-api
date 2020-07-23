import jwt from "jsonwebtoken";
import { getUsers, getUser, createUser, authenticateUser } from "./users";

export const resolvers = {
  Query: {
    users: async (parent, { limit }) => {
      return await getUsers(limit);
    },
    user: async (parent, { username }) => {
      return await getUser(username);
    },
  },
  Mutation: {
    register: async (parent, { username, password }) => {
      const createdUser = await createUser({ username, password });
      return createdUser;
    },
    login: async (parent, { username, password }, context) => {
      const user = await authenticateUser(username, password);
      if (!user) throw new Error("Unauthenticated");

      const token = jwt.sign(
        {
          user: { username: user.username },
        },
        context.secret,
        {
          expiresIn: "1y",
        }
      );

      return token;
    },
  },
};
