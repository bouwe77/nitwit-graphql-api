import mapToFollowerSchema from "./mapping";
import Follower from "./model";

export const createFollowingFunctions = (user) => ({
  getFollowers,
  getFollowing,
  createFollowing: (followingUserId) => createFollowing(followingUserId, user),
});

async function getFollowers(userId, limit) {
  const data = await Followers.find({ followingUserId: userId });

  if (!limit) limit = data.length;

  const followers = data.slice(0, limit).map(mapToFollowerSchema);

  return followers;
}

async function getFollowing(userId, limit) {
  const data = await Followers.find({ userId });

  if (!limit) limit = data.length;

  const following = data.slice(0, limit).map(mapToFollowerSchema);

  return following;
}

async function createFollowing(user, followingUserId) {
  if (!user) throw new Error("Unauthorized");

  const follower = { userId: user.id, followingUserId };

  const createdFollower = await Follower.create(follower);

  return mapToFollowerSchema(createdFollower);
}
