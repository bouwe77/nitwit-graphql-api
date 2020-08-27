import ApolloClient from "apollo-boost";
import { getJwtTokenFromLocalStorage } from "./auth/jwt";

export default function getClient() {
  return new ApolloClient({
    uri: "http://localhost:7778",
    request: (operation) => {
      const token = getJwtTokenFromLocalStorage();

      operation.setContext({
        headers: {
          authorization: token || "",
        },
      });
    },
  });
}
