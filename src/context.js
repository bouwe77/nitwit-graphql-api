import { getUserFromToken, createSignedToken } from "./jwt";
import { createUserFunctions } from "./users";

export function createContext(req) {
  const secret = process.env.SECRET;

  const user = getUserFromToken(req.req.headers, secret);

  return {
    users: createUserFunctions(user),
    createSignedToken: (user) => createSignedToken(user, secret),
  };
}
