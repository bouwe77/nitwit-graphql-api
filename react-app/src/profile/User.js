import React from "react";

export default function User({ user }) {
  return (
    <>
      <h1>@{user.username}</h1>
      <div>{user.followerCount} followers</div>
      <div>{user.followingCount} following</div>
    </>
  );
}
