import { ApolloServer } from "apollo-server";
require("dotenv").config();

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => ({
    secret: process.env.SECRET,
  }),
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
