import React from "react";

export default function Post({ post }) {
  return (
    <div className="post">
      {post.text}
      <br />
      <a href={`/${post.author.username}`}>@{post.author.username}</a>
    </div>
  );
}
