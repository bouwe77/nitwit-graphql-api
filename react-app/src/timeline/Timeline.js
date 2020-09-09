import React from "react";
import { GET_TIMELINE } from "./queries";
import { useQuery } from "@apollo/react-hooks";
import Posts from "../posts/Posts";
import CreatePostModalButton from "../posts/CreatePostModalButton";

export default function Timeline() {
  const { loading, error, data } = useQuery(GET_TIMELINE, {});

  function reload() {
    // TODO Replace this dirty hack with GraphQL subscriptions
    // I think this issue was my problem: https://github.com/apollographql/react-apollo/issues/3355
    document.location = "/";
  }

  if (loading) return null;
  if (error) return `Error: ${error.message}`;

  return (
    <>
      <div style={{ padding: "10px 0px", textAlign: "right" }}>
        <CreatePostModalButton onSuccess={reload} />
      </div>
      <Posts posts={data.timeline} />
    </>
  );
}
