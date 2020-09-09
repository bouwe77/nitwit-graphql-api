import React from "react";

export default function FollowList({ users }) {
  return (
    <div className="followers">
      {users.map((user) => (
        <div key={user.id} className="follower">
          {user.name}{" "}
          <a href={`/${user.username}`} className="usernameLink">
            @{user.username}
          </a>{" "}
          <br />
          {user.followerCount} followers - {user.followingCount} following
        </div>
      ))}
    </div>
  );
}
