import { ApolloServer } from "apollo-server";
require("dotenv").config();

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { createContext } from "./context";

// const corsOptions = {
//   origin: "*",
//   credentials: true,
// };

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => createContext(req),
  //cors: corsOptions,
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
