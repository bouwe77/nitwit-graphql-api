import React from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  let { username } = useParams();

  return <>Profile for {username}</>;
}
