import React, { useState } from "react";
import User from "./User";
import Posts from "../posts/Posts";
import { GET_PROFILE } from "./queries";
import { useQuery } from "@apollo/react-hooks";
import CreatePostModal from "../posts/CreatePostModal";
import { useAuth } from "../auth/AuthContext";
import Followers from "./Followers";
import Following from "./Following";
import { FollowOrUnfollow } from "./FollowOrUnfollow";

export default function Profile({ username }) {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: { username },
  });

  if (loading) return null;
  if (error) return `Error: ${error.message}`;
  if (!data.userByUsername) return "User not found";

  let alreadyFollowing =
    user &&
    user.username !== username &&
    data.userByUsername.followers.some((f) => f.user.id === user.id);

  return (
    <>
      <button
        hidden={!user || user?.username !== username}
        onClick={() => setShowModal(true)}
      >
        Create Post
      </button>

      {user && user.username !== username && (
        <FollowOrUnfollow
          userId={data.userByUsername.id}
          alreadyFollowing={alreadyFollowing}
        />
      )}

      <Followers userId={data.userByUsername.id} />
      <Following userId={data.userByUsername.id} />

      <User user={data.userByUsername} />
      <Posts posts={data.userByUsername.posts} />
      <CreatePostModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
}
