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

  return (
    <>
      {status === "error" && <div>Username and/or password incorrect</div>}

      <form onSubmit={handleSubmit}>
        Username{" "}
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <br />
        Password{" "}
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
}
