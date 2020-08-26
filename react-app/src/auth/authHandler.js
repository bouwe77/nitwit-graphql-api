import * as jwt from "./jwt";

/**
 * Authenticates against the API with the given credentials.
 * If successful, a JWT token is stored in the browser's local storage.
 */
async function login(username, password) {
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
function logout() {
  jwt.removeJwtToken();
}

async function getMe() {
  //TODO Get token from local storage
  //TODO Return null if no token
  //TODO Call the "me" query
  //TODO Return user data, if found.
  //TODO Otherwise return null.
}

function authenticate(username, password) {
  if (username === "bouwe")
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYyMDhmZTZjZjU3ZDA1NGZhYTJiZmVhIiwidXNlcm5hbWUiOiJib3V3ZSJ9LCJpYXQiOjE1OTg0NjkzMjgsImV4cCI6MTYzMDAyNjkyOH0.wa2HmEf87kxs-zczVHOQ1bryoxYjGpeZlhgln64PE9U";

  throw new Error("Unauthorized");
}

export { login, logout, getMe };
