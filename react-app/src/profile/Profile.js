import React, { useState } from "react";
import User from "./User";
import Posts from "../posts/Posts";
import { GET_PROFILE } from "./queries";
import { useQuery } from "@apollo/react-hooks";
import CreatePostModal from "../posts/CreatePostModal";

export default function Profile({ username }) {
  const [showModal, setShowModal] = useState(false);

  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: { username },
  });

  if (loading) return null;
  if (error) return `Error: ${error.message}`;

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Post</button>
      <User user={data.userByUsername} />
      <Posts posts={data.userByUsername.posts} />
      <CreatePostModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
}
