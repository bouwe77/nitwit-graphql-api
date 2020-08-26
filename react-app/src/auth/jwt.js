const localStorageKey = "nitwit_auth_token";

/**
 * Saves the JWT token to local storage.
 */
function saveJwtToken(token) {
  return window.localStorage.setItem(localStorageKey, token);
}

/**
 * Removes the JWT token from local storage.
 */
function removeJwtToken() {
  return window.localStorage.removeItem(localStorageKey);
}

/**
 * Gets the JWT token from local storage.
 */
function getJwtToken() {
  return window.localStorage.getItem(localStorageKey);
}

export { saveJwtToken, removeJwtToken, getJwtToken };
