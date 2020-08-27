import React from "react";
import { useAuth } from "../auth/AuthContext";

export default function Sidebar() {
  const { isSignedIn, signOut } = useAuth();

  return <>{isSignedIn && <button onClick={signOut}>Sign Out</button>}</>;
}
