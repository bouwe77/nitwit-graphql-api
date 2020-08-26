import React from "react";
import { GET_TIMELINE } from "./queries";
import { useQuery } from "@apollo/react-hooks";
import Post from "../posts/Post";

export default function Timeline() {
  const { loading, error, data } = useQuery(GET_TIMELINE, {});

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  return (
    <>
      {data.timeline.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}
