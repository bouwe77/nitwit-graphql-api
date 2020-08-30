import React from "react";
import ReactTimeAgo from "react-time-ago";
import { useAuth } from "../auth/AuthContext";
//import twitter from "twitter-text";

export default function Post({ post, retweet, reply }) {
  const { isSignedIn } = useAuth();

  const text = post.text;

  // let mentions = twitter.extractMentions(originalText);
  // mentions = [...new Set([...mentions])];

  return (
    <>
      <div className="post">
        <a href={`/${post.author.username}`}>@{post.author.username}</a>{" "}
        <ReactTimeAgo date={Date.parse(post.timestamp)} timeStyle="twitter" />
        <br />
        {text}
        <br />
        <button
          disabled={!isSignedIn}
          onClick={() => retweet(post.text, post.author.username)}
        >
          Retweet
        </button>{" "}
        <button disabled={!isSignedIn} onClick={() => reply(post.text)}>
          Reply
        </button>
      </div>
    </>
  );
}
