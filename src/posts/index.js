import validate from "validate.js";

import mapToPostSchema from "./mapping";
import Post from "./model";
import TimelinePost from "../timeline/model";
import { extractMentions } from "twitter-text";

export const createPostFunctions = (user) => ({
  getPosts,
  createPost: (post, getFollowers, getUsersByUsernames) =>
    createPost(post, user, getFollowers, getUsersByUsernames),
});

async function getPosts(authorUserId, limit) {
  const data = await Post.find({ authorUserId });

  if (!limit) limit = data.length;

  const posts = data.slice(0, limit).map(mapToPostSchema);

  return posts;
}

async function createPost(post, user, getFollowers, getUsersByUsernames) {
  if (!user) throw new Error("Unauthorized");

  post.authorUserId = user.id;

  validateNewPost(post);

  const followers = await getFollowers(user.id);
  const followerUserIds = [...followers.map((f) => f.userId), user.id];

  const mentions = extractMentions(post.text);
  const mentionedUsers = await getUsersByUsernames(mentions, false);
  const mentionedUserIds = mentionedUsers.map((u) => u._id);

  const timelineUserIds = [...followerUserIds, ...mentionedUserIds];

  const createdPost = await createPostInTransaction(post, timelineUserIds);

  return mapToPostSchema(createdPost);
}

function validateNewPost(post) {
  const postConstraints = {
    text: {
      presence: true,
      length: {
        minimum: 1,
        message: "must not be empty",
      },
    },
    authorUserId: {
      presence: true,
      length: {
        minimum: 1,
        message: "must not be empty",
      },
    },
  };

  const errors = validate(post, postConstraints, { format: "flat" });
  if (errors) throw new Error(errors.join(", "));
}

// Inpiration for this transaction implementation with MongoDB comes from this blog post: https://www.mongodb.com/blog/post/quick-start-nodejs--mongodb--how-to-implement-transactions
async function createPostInTransaction(post, timelineUserIds) {
  const session = await Post.startSession();

  const transactionOptions = {
    readPreference: "primary",
    readConcern: { level: "local" },
    writeConcern: { w: "majority" },
  };

  let createdPost = null;

  try {
    const transactionResult = await session.withTransaction(async () => {
      // Create the post.
      const createdPosts = await Post.create([post], { session });
      createdPost = createdPosts[0];

      // Also create the same post on the timelines of the author, all followers and all mentioned users.
      const timelinePosts = timelineUserIds.map((userId) => {
        return { ...post, timelineUserId: userId };
      });
      await TimelinePost.create(timelinePosts, { session });
    }, transactionOptions);

    if (!transactionResult) console.log("Transaction intentionally aborted");
  } catch (e) {
    console.error("Transaction aborted due to an unexpected error: " + e);
  } finally {
    await session.endSession();
  }

  return createdPost;
}
