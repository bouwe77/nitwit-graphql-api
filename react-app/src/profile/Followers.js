import React from "react";
import FollowList from "../following/FollowList";
import { GET_FOLLOWERS } from "./queries";
import { useQuery } from "@apollo/react-hooks";

export default function Followers({ userId }) {
  const { loading, error, data } = useQuery(GET_FOLLOWERS, {
    variables: { userId },
  });

  if (loading) return null;
  if (error) return `Error: ${error.message}`;

  const users = data?.followers?.map((f) => f.user);

  if (users.length === 0)
    return (
      <>
        <br />
        Not yet followed by anyone...
      </>
    );

  return <FollowList users={users} />;
}
