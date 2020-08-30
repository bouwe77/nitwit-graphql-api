import { mapToFollowerSchema, mapToFollowUnfollowResult } from "./mapping";
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
  deleteFollowing: (
    followingUserId,
    updateFollowerCount,
    updateFollowingCount
  ) =>
    deleteFollowing(
      user,
      followingUserId,
      updateFollowerCount,
      updateFollowingCount
    ),
});

// Get following information for all users that are following the given user.
async function getFollowers(userId, skip, limit) {
  if (!limit) limit = 100;
  if (!skip) skip = 0;

  const data = await Follower.find({ followingUserId: userId })
    .skip(skip)
    .limit(limit);

  const followers = data.map((f) => mapToFollowerSchema(f, false));

  return followers;
}

// Get following information for all users the given user is following.
async function getFollowing(userId, skip, limit) {
  if (!limit) limit = 100;
  if (!skip) skip = 0;

  const data = await Follower.find({ userId }).skip(skip).limit(limit);

  const following = data.map((f) => mapToFollowerSchema(f, true));

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

  // If the following combination already exits just return that one.
  const existingFollowing = await Follower.findOne({
    userId: user.id,
    followingUserId,
  });
  //TODO iets anders teruggeven
  if (existingFollowing) return mapToFollowerSchema(null);

  // The user you are trying to follow must exist.
  const followingUser = await getUser(followingUserId);
  if (!followingUser) throw new Error("User not found");

  // Everything seems fine, so save the following data.
  const following = { userId: user.id, followingUserId };
  await createFollowingInTransaction(
    following,
    updateFollowerCount,
    updateFollowingCount
  );

  return mapToFollowUnfollowResult(true);
}

async function deleteFollowing(
  user,
  followingUserId,
  updateFollowerCount,
  updateFollowingCount
) {
  if (!user) throw new Error("Unauthorized");

  // You can not unfollow yourself.
  if (user.id === followingUserId)
    throw new Error("You can not unfollow yourself");

  // If the following combination does not exist, ....
  const existingFollowing = await Follower.findOne({
    userId: user.id,
    followingUserId,
  });
  if (!existingFollowing) return mapToFollowerSchema(null);

  // Everything seems fine, so delete the following data.
  await deleteFollowingInTransaction(
    existingFollowing,
    updateFollowerCount,
    updateFollowingCount
  );

  return mapToFollowUnfollowResult(true);
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
      // Create the following data.
      const created = await Follower.create([following], { session });
      createdFollowing = created[0];

      // Update the follower/following counts of the users.
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

async function deleteFollowingInTransaction(
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

  try {
    const transactionResult = await session.withTransaction(async () => {
      // Delete the following data.
      await Follower.deleteOne({ _id: following._id }, { session });

      // Update the follower/following counts of the users.
      await updateFollowerCount(following.followingUserId, session, false);
      await updateFollowingCount(following.userId, session, false);
    }, transactionOptions);

    if (!transactionResult) console.log("Transaction intentionally aborted");
  } catch (e) {
    console.error("Transaction aborted due to an unexpected error: " + e);
  } finally {
    await session.endSession();
  }

  return following;
}
