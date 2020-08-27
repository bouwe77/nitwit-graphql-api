import ApolloClient from "apollo-boost";
import { getJwtToken } from "./auth/jwt";

export default function getClient() {
  return new ApolloClient({
    uri: "http://localhost:7778/graphql",
    request: (operation) => {
      const token = getJwtToken();

      operation.setContext({
        headers: {
          authorization: token || "",
        },
      });
    },
  });
}
