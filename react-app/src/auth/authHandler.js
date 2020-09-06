import * as jwt from "./jwt";
import { gql } from "@apollo/client";
import getClient from "../apolloClient";

/**
 * Authenticates against the API with the given credentials.
 * If successful, a JWT token is stored in the browser's local storage.
 */
async function signIn(username, password) {
  try {
    const token = await authenticate(username, password);
    jwt.saveJwtToken(token);
  } catch (error) {
    jwt.removeJwtToken();
    throw error;
  }
}

/**
 * Logout means: just remove the JWT token.
 */
function signOut() {
  jwt.removeJwtToken();
}

async function getMe() {
  const token = jwt.getJwtToken();
  if (!token) return null;

  try {
    const client = getClient();
    const result = await client.query({
      query: gql`
        query currentlyLoggedInUser {
          me {
            id
            username
          }
        }
      `,
    });
    return result?.data?.me;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function authenticate(username, password) {
  try {
    const client = getClient();

    const result = await client.mutate({
      mutation: gql`
        mutation Authenticate($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            token
          }
        }
      `,
      variables: { username, password },
    });
    return result?.data?.login?.token;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { signIn, signOut, getMe };
