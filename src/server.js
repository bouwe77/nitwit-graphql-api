import { ApolloServer } from "apollo-server";
require("dotenv").config();

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { createContext } from "./context";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => createContext(req),
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
