import React from "react";
import { GET_USER } from "./queries";
import { useQuery } from "@apollo/react-hooks";

export default function Profile({ username }) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { username },
  });

  if (loading) return null;
  if (error) return `Error: ${error.message}`;

  if (!data || !data.userByUsername) return `User ${username} not found`;

  const user = data.userByUsername;

  return (
    <>
      <div>@{user.username}</div>
      <div>{user.followerCount} followers</div>
      <div>{user.followingCount} following</div>
    </>
  );
}
