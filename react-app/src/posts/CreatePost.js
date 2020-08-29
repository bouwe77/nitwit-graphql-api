import React, { useState } from "react";
import { CREATE_POST } from "./mutations";
import { useMutation } from "@apollo/react-hooks";

export default function CreatePost() {
  const [text, setText] = useState("");

  const [createPost, { loading, error }] = useMutation(CREATE_POST);

  if (loading) return null;
  if (error) return `Error: ${error.message}`;

  function handleSubmit(event) {
    event.preventDefault();
    createPost({ variables: { text } });
    setText("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <button>OK</button>
      </form>
    </>
  );
}
