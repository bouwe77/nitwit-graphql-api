import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import "./styles.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { getJwtTokenFromLocalStorage } from "./auth/jwt";

const client = new ApolloClient({
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

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
