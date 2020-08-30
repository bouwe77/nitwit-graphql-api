import React from "react";
import FollowList from "../following/FollowList";
import { GET_FOLLOWING } from "./queries";
import { useQuery } from "@apollo/react-hooks";

export default function Following({ userId }) {
  const { loading, error, data } = useQuery(GET_FOLLOWING, {
    variables: { userId },
  });

  if (loading) return null;
  if (error) return `Error: ${error.message}`;

  const users = data?.following?.map((f) => f.user);

  return <FollowList users={users} />;
}
