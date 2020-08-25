import mapToFollowerSchema from "./mapping";
import Follower from "./model";

export const createFollowingFunctions = (user) => ({
  getFollowers,
  getFollowing,
  createFollowing: (
    followingUserId,
    getUser,
    updateFollowerCount,
    updateFollowingCount
  ) =>
    createFollowing(
      user,
      followingUserId,
      getUser,
      updateFollowerCount,
      updateFollowingCount
    ),
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

async function createFollowing(
  user,
  followingUserId,
  getUser,
  updateFollowerCount,
  updateFollowingCount
) {
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
  const following = { userId: user.id, followingUserId };
  const createdFollowing = await createFollowingInTransaction(
    following,
    updateFollowerCount,
    updateFollowingCount
  );

  return mapToFollowerSchema(createdFollowing);
}

// Inpiration for this transaction implementation with MongoDB comes from this blog post: https://www.mongodb.com/blog/post/quick-start-nodejs--mongodb--how-to-implement-transactions
async function createFollowingInTransaction(
  following,
  updateFollowerCount,
  updateFollowingCount
) {
  const session = await Follower.startSession();

  const transactionOptions = {
    readPreference: "primary",
    readConcern: { level: "local" },
    writeConcern: { w: "majority" },
  };

  let createdFollowing = null;

  try {
    const transactionResult = await session.withTransaction(async () => {
      // Create the following.
      const created = await Follower.create([following], { session });
      createdFollowing = created[0];

      // Update the users
      await updateFollowerCount(following.followingUserId, session);
      await updateFollowingCount(following.userId, session);
    }, transactionOptions);

    if (!transactionResult) console.log("Transaction intentionally aborted");
  } catch (e) {
    console.error("Transaction aborted due to an unexpected error: " + e);
  } finally {
    await session.endSession();
  }

  return createdFollowing;
}
