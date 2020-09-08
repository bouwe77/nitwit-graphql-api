import React from "react";
import Posts from "../posts/Posts";
import CreatePostModalButton from "../posts/CreatePostModalButton";
import { useAuth } from "../auth/AuthContext";

export default function ProfilePosts({ user }) {
  const { user: signedInUser } = useAuth();

  return (
    <>
      {signedInUser && signedInUser.username === user.username && (
        <CreatePostModalButton />
      )}
      <Posts posts={user.posts} />
    </>
  );
}
