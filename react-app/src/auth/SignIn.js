import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export default function SignIn() {
  const { signIn, isSignedIn, isLoading } = useAuth();
  const [status, setStatus] = useState("init");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signIn(username, password);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  }

  if (isSignedIn || isLoading) return null;

  const disabled =
    !username || username.length < 1 || !password || password.length < 1;

  return (
    <>
      {status === "error" && <div>Username and/or password incorrect</div>}
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        Username
        <br />
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <br />
        <br />
        Password
        <br />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <br />
        <button type="submit" disabled={disabled} className="signInButton">
          Sign In
        </button>
      </form>
    </>
  );
}
