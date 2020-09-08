import React, { useState } from "react";
import ProfilePosts from "./ProfilePosts";
import { GET_PROFILE } from "./queries";
import { useQuery } from "@apollo/react-hooks";
import Followers from "./Followers";
import Following from "./Following";
import { FollowOrUnfollow } from "./FollowOrUnfollow";
import { useAuth } from "../auth/AuthContext";

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

  return (
    <>
      <h1>{data.userByUsername.username}</h1>
      <div>{data.userByUsername.followerCount} followers</div>
      <div>{data.userByUsername.followingCount} following</div>

      {signedInUser &&
        signedInUser.username !== data.userByUsername.username && (
          <FollowOrUnfollow
            userId={data.userByUsername.id}
            alreadyFollowing={alreadyFollowing}
          />
        )}

      <button onClick={() => setTab("posts")}>Profile</button>
      <button onClick={() => setTab("followers")}>Followers</button>
      <button onClick={() => setTab("following")}>Following</button>

      {tab === "posts" && <ProfilePosts user={data.userByUsername} />}

      {tab === "followers" && <Followers userId={data.userByUsername.id} />}

      {tab === "following" && <Following userId={data.userByUsername.id} />}
    </>
  );
}
