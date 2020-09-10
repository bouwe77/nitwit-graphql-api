import React, { useState } from "react";
import Posts from "../posts/Posts";
import { GET_PROFILE } from "./queries";
import { useQuery } from "@apollo/react-hooks";
import Followers from "./Followers";
import Following from "./Following";
import { FollowOrUnfollow } from "./FollowOrUnfollow";
import { useAuth } from "../auth/AuthContext";
import CreatePostModalButton from "../posts/CreatePostModalButton";

export default function Profile({ username }) {
  const { user: signedInUser } = useAuth();
  const [tab, setTab] = useState("posts");

  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: { username },
  });

  if (loading) return null;
  if (error) return `Error: ${error.message}`;
  if (!data.userByUsername) return "User not found";

  let alreadyFollowing =
    signedInUser &&
    signedInUser.username !== data.userByUsername.username &&
    data.userByUsername.followers.some((f) => f.user.id === signedInUser.id);

  const { userByUsername: user } = data;

  return (
    <>
      <h1>
        {user.name} - @{user.username}
      </h1>
      <div>
        <div style={{ display: "flex" }}>
          <div>{user.bio}</div>
          <div>
            {signedInUser && signedInUser.username === user.username && (
              <CreatePostModalButton />
            )}
          </div>
        </div>
        <div>
          {user.followerCount} followers - {user.followingCount} following
        </div>
      </div>

      {signedInUser && signedInUser.username !== user.username && (
        <FollowOrUnfollow
          userId={user.id}
          alreadyFollowing={alreadyFollowing}
        />
      )}

      <div className="tabs">
        <button
          onClick={() => setTab("posts")}
          className={`buttonNavLink tab ${tab === "posts" ? "active" : ""}`}
        >
          Profile
        </button>
        <button
          onClick={() => setTab("followers")}
          className={`buttonNavLink tab ${tab === "followers" ? "active" : ""}`}
        >
          Followers
        </button>
        <button
          onClick={() => setTab("following")}
          className={`buttonNavLink tab ${tab === "following" ? "active" : ""}`}
        >
          Following
        </button>
      </div>

      {tab === "posts" && <Posts posts={user.posts} />}

      {tab === "followers" && <Followers userId={user.id} />}

      {tab === "following" && <Following userId={user.id} />}
    </>
  );
}
