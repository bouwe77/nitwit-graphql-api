import React, { useState } from "react";
import Post from "./Post";
import CreatePostModal from "./CreatePostModal";
import { useAuth } from "../auth/AuthContext";
import twitter from "twitter-text";

export default function Posts({ posts }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);

  function retweet(originalText, authorUsername) {
    setText(`RT @${authorUsername} ${originalText}`);
    setShowModal(true);
  }

  function reply(originalText) {
    let mentions = twitter.extractMentions(originalText);
    mentions = [user.username, ...mentions];
    mentions = [...new Set([...mentions])];
    const text = mentions.map((m) => "@" + m).join(" ") + " ";
    setText(text);
    setShowModal(true);
  }

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} retweet={retweet} reply={reply} />
      ))}

      <CreatePostModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        text={text}
      />
    </>
  );
}
