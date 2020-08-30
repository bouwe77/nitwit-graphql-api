import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import "./styles.css";
import { ApolloProvider } from "@apollo/react-hooks";
import getClient from "./apolloClient";
import { AuthProvider } from "./auth/AuthContext";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

JavascriptTimeAgo.addLocale(en);

const client = getClient();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AuthProvider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
