import React from "react";
import { FOLLOW, UNFOLLOW } from "./queries";
import { useMutation } from "@apollo/react-hooks";

export function FollowOrUnfollow({ userId, alreadyFollowing }) {
  const [follow, { followLoading, followError }] = useMutation(FOLLOW);
  const [unfollow, { unfollowLoading, unfollowError }] = useMutation(UNFOLLOW);

  if (followLoading || unfollowLoading) return null;
  if (followError || unfollowError)
    return `Error: ${followError?.message} ${unfollowError?.message}`;

  return (
    <>
      {alreadyFollowing ? (
        <button onClick={() => unfollow({ variables: { userId } })}>
          Unfollow
        </button>
      ) : (
        <button onClick={() => follow({ variables: { userId } })}>
          Follow
        </button>
      )}
    </>
  );
}
