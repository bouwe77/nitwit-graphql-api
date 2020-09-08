import { ApolloServer } from "apollo-server";
require("dotenv").config();

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { createContext } from "./context";

//TODO if CORS is necessary: https://www.rockyourcode.com/how-to-enable-cors-for-apollo-server/

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => createContext(req),
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
