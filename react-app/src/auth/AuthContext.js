import React, { createContext, useState, useEffect, useContext } from "react";
import * as auth from "./authHandler";

/**
 * The AuthContext handles context regarding authentication related functionality.
 */
const AuthContext = createContext();

/**
 * The AuthProvider is the provider for the AuthContext, which contains
 * data of the logged in user and functions for logging in or out.
 */
function AuthProvider(props) {
  const [user, setUser] = useState();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;

    async function initUserStateWrapper() {
      await initUserState();
    }
    if (!didCancel) initUserStateWrapper();

    return () => {
      didCancel = true;
    };
  }, []);

  async function initUserState() {
    setIsLoading(true);
    try {
      const user = await auth.getMe();
      setUser(user);
      setIsSignedIn(user != null);
    } catch (e) {
      setUser(null);
      setIsSignedIn(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(username, password) {
    try {
      await auth.signIn(username, password);
      initUserState();
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  }

  function signOut() {
    setUser(null);
    setIsSignedIn(false);
    auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isSignedIn, isLoading }}
      {...props}
    />
  );
}

/**
 * The useAuth hook exposes the AuthContext.
 */
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
