import { getUserFromToken, createSignedToken } from "./jwt";
import { createUserFunctions } from "./users";
import { createPostFunctions } from "./posts";
import { createTimelineFunctions } from "./timeline";

export function createContext(req) {
  const secret = process.env.SECRET;

  const user = getUserFromToken(req.req.headers, secret);

  return {
    users: createUserFunctions(user),
    posts: createPostFunctions(user),
    timeline: createTimelineFunctions(user),
    createSignedToken: (user) => createSignedToken(user, secret),
  };
}
