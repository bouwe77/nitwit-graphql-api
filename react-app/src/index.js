import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import "./styles.css";
import { ApolloProvider } from "@apollo/react-hooks";
import getClient from "./apolloClient";

const client = getClient();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
