import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export default function SignIn() {
  const { signIn, isSignedIn } = useAuth();
  const [status, setStatus] = useState("init");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    try {
      await signIn(username, password);
      setStatus("success");
    } catch (error) {
      //alert(error);
      setStatus("error");
    }
  }

  if (isSignedIn) return "Ja, klaar";

  return (
    <>
      {status === "error" && <div>Error...</div>}

      {status === "success" && <div>Success!!!</div>}

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
