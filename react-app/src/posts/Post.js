import React from "react";
import TimeAgo from "react-time-ago";
import { useAuth } from "../auth/AuthContext";
//import twitter from "twitter-text";

export default function Post({ post, retweet, reply }) {
  const { isSignedIn } = useAuth();

  const text = post.text;

  // let mentions = twitter.extractMentions(originalText);
  // mentions = [...new Set([...mentions])];

  return (
    <div className="post">
      {post.author.name}{" "}
      <a href={`/${post.author.username}`} className="usernameLink">
        @{post.author.username}
      </a>{" "}
      - <TimeAgo date={Date.parse(post.timestamp)} timeStyle="twitter" />
      <div className="text">{text}</div>
      <button
        disabled={!isSignedIn}
        onClick={() => retweet(post.text, post.author.username)}
        className="buttonLink"
        style={{ paddingRight: "10px" }}
      >
        retweet
      </button>{" "}
      <button
        disabled={!isSignedIn}
        onClick={() => reply(post.text, post.author.username)}
        className="buttonLink"
      >
        reply
      </button>
    </div>
  );
}
