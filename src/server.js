import { ApolloServer } from "apollo-server";
require("dotenv").config();

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { getUserFromToken } from "./jwt";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => {
    const secret = process.env.SECRET;
    const user = getUserFromToken(req.req.headers, secret);
    return { user, secret };
  },
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
