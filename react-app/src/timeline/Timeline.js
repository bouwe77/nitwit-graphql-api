import React from "react";
import { GET_TIMELINE } from "./queries";
import { useQuery } from "@apollo/react-hooks";
import Posts from "../posts/Posts";
import CreatePost from "../posts/CreatePost";
import CreatePostModalButton from "../posts/CreatePostModalButton";

export default function Timeline() {
  const { loading, error, data } = useQuery(GET_TIMELINE, {});

  function reload() {
    // I think this issue was my problem: https://github.com/apollographql/react-apollo/issues/3355
    // TODO Replace this dirty hack with GraphQL subscriptions
    document.location = "/";
  }

  if (loading) return null;
  if (error) return `Error: ${error.message}`;

  return (
    <>
      <CreatePostModalButton onSuccess={reload} />
      <Posts posts={data.timeline} />
    </>
  );
}
