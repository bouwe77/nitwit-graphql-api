import mapToFollowerSchema from "./mapping";
import Follower from "./model";

export const createFollowingFunctions = (user) => ({
  getFollowers,
  getFollowing,
  createFollowing: (followingUserId, getUser) =>
    createFollowing(user, followingUserId, getUser),
});

// Get following information for all users that are following the given user.
async function getFollowers(userId, limit) {
  const data = await Follower.find({ followingUserId: userId });

  if (!limit) limit = data.length;

  const followers = data.slice(0, limit).map(mapToFollowerSchema);

  return followers;
}

// Get following information for all users the given user is following.
async function getFollowing(userId, limit) {
  const data = await Follower.find({ userId });

  if (!limit) limit = data.length;

  const following = data.slice(0, limit).map(mapToFollowerSchema);

  return following;
}

async function createFollowing(user, followingUserId, getUser) {
  if (!user) throw new Error("Unauthorized");

  // You can not follow yourself.
  if (user.id === followingUserId)
    throw new Error("You can not follow yourself");

  // If the following combination aready exits just return that one.
  const existingFollowing = await Follower.findOne({
    userId: user.id,
    followingUserId,
  });
  if (existingFollowing) return mapToFollowerSchema(existingFollowing);

  // The user you are trying to follow must exist.
  const followingUser = await getUser(followingUserId);
  if (!followingUser) throw new Error("User not found");

  // Everything seems fine, save the following request.
  const follower = { userId: user.id, followingUserId };
  const createdFollower = await Follower.create(follower);

  return mapToFollowerSchema(createdFollower);
}
