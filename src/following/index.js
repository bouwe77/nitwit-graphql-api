import mapToFollowerSchema from "./mapping";
import Follower from "./model";

export const createFollowingFunctions = (user) => ({
  getFollowers,
  getFollowing,
  createFollowing: (followingUserId, getUser) =>
    createFollowing(user, followingUserId, getUser),
});

async function getFollowers(userId, limit) {
  const data = await Follower.find({ followingUserId: userId });

  if (!limit) limit = data.length;

  const followers = data.slice(0, limit).map(mapToFollowerSchema);

  return followers;
}

async function getFollowing(userId, limit) {
  const data = await Follower.find({ userId });

  if (!limit) limit = data.length;

  const following = data.slice(0, limit).map(mapToFollowerSchema);

  return following;
}

async function createFollowing(user, followingUserId, getUser) {
  if (!user) throw new Error("Unauthorized");

  const followingUser = await getUser(followingUserId);
  if (!followingUser) throw new Error("User not found");

  const follower = { userId: user.id, followingUserId };

  const createdFollower = await Follower.create(follower);

  return mapToFollowerSchema(createdFollower);
}
