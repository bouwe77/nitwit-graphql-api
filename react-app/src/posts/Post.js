import React from "react";

export default function Post({ post }) {
  return (
    <div className="post">
      {post.text}
      <br />
      {post.author.username}
    </div>
  );
}
