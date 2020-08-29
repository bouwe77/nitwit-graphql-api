import React, { useState } from "react";
import { CREATE_POST } from "./mutations";
import { useMutation } from "@apollo/react-hooks";

export default function CreatePost({ onSuccess }) {
  const [text, setText] = useState("");

  const [createPost, { loading, error }] = useMutation(CREATE_POST);

  if (loading) return null;
  if (error) return `Error: ${error.message}`;

  function handleSubmit(event) {
    event.preventDefault();
    createPost({ variables: { text } });
    setText("");
    if (onSuccess) onSuccess();
  }

  function handleChange(event) {
    const text = event.target.value;
    if (text.length > 149) return;
    setText(text);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={handleChange} />
        <button>OK</button>
      </form>
    </>
  );
}
