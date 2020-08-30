import React from "react";

export default function FollowList({ users }) {
  return (
    <>
      {users.map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}
    </>
  );
}
