import React from "react";
import { GET_TIMELINE } from "./queries";
import { useQuery } from "@apollo/react-hooks";
import Posts from "../posts/Posts";
import CreatePost from "../posts/CreatePost";

export default function Timeline() {
  const { loading, error, data } = useQuery(GET_TIMELINE, {});

  if (loading) return null;
  if (error) return `Error: ${error.message}`;

  return (
    <>
      <CreatePost />
      <Posts posts={data.timeline} />
    </>
  );
}
