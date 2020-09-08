import React from "react";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { isSignedIn, signOut } = useAuth();

  return (
    <div className="header">
      <div className="headerLogo">
        <a href="/">
          <img src="/nitwit-logo.jpeg" alt="nitwit" />
        </a>
      </div>

      <div className="headerButtons">
        {isSignedIn && <button onClick={signOut}>Sign Out</button>}
      </div>
    </div>
  );
}
