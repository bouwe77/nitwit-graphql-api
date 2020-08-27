import React, { useState, useEffect } from "react";
import SignIn from "../auth/SignIn";
import { useAuth } from "../auth/AuthContext";
import Timeline from "../timeline/Timeline";
import Profile from "../profile/Profile";

const regex = RegExp("^[a-zA-Z0-9_]*$");

export default function Page() {
  const { isSignedIn } = useAuth();
  const [path, setPath] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const path = window.location.pathname.replace(new RegExp("/", "g"), "");
    const pathValid = regex.test(path);
    if (pathValid) setPath(path);
    else setError(true);
  }, []);

  if (error) return "Page not found";

  if (path === "") {
    if (isSignedIn) return <Timeline />;
    return <SignIn />;
  }

  return <Profile username={path} />;
}
