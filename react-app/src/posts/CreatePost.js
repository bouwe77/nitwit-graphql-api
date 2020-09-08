import React, { useState, useEffect } from "react";
import { CREATE_POST } from "./mutations";
import { useMutation } from "@apollo/react-hooks";

export default function CreatePost({ initialText, onSuccess }) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const [createPost, { loading, error }] = useMutation(CREATE_POST);

  if (loading) return null;
  if (error) return `Error: ${error.message}`;

  function handleSubmit(event) {
    event.preventDefault();
    createPost({ variables: { text } });
    if (onSuccess) onSuccess();
    setText("");
  }

  function handleChange(event) {
    const text = event.target.value;
    if (text.length > 149) return;
    setText(text);
  }

  const disabled = !text || text.length < 1;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={handleChange} autoFocus />
        <button type="submit" disabled={disabled}>
          OK
        </button>
      </form>
    </>
  );
}
