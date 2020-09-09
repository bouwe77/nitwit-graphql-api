import React from "react";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { isSignedIn, signOut } = useAuth();

  return (
    <div className="header">
      <div className="headerLogoContainer">
        <a href="/">
          <img src="/nitwit-logo.jpeg" alt="nitwit" className="logo" />
        </a>
      </div>

      <div className="headerButtons">
        {isSignedIn && (
          <button className="buttonNavLink" onClick={signOut}>
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}
