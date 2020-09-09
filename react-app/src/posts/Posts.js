import React, { useState } from "react";
import Post from "./Post";
import CreatePostModal from "./CreatePostModal";
import twitter from "twitter-text";

export default function Posts({ posts }) {
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);

  function retweet(originalText, authorUsername) {
    setText(`RT @${authorUsername} ${originalText}`);
    setShowModal(true);
  }

  function reply(originalText, authorUsername) {
    let mentions = twitter.extractMentions(originalText);
    mentions = [authorUsername, ...mentions];
    mentions = [...new Set([...mentions])];
    const text = mentions.map((m) => "@" + m).join(" ") + " ";
    setText(text);
    setShowModal(true);
  }

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post.id} post={post} retweet={retweet} reply={reply} />
      ))}

      <CreatePostModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        text={text}
      />
    </div>
  );
}
