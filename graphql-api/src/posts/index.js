import validate from "validate.js";
import mapToPostSchema from "./mapping";
import Post from "./model";
import TimelinePost from "../timeline/model";
import { extractMentions, extractHashtagsWithIndices } from "twitter-text";

export const createPostFunctions = (user) => ({
  getPosts,
  createPost: (post, getFollowers, getUsersByUsernames) =>
    createPost(post, user, getFollowers, getUsersByUsernames),
});

async function getPosts(authorUserId, skip, limit) {
  if (!limit) limit = 100;
  if (!skip) skip = 0;

  const data = await Post.find({ authorUserId })
    .sort({
      timestamp: "asc",
    })
    .skip(skip)
    .limit(limit);

  const posts = data.map(mapToPostSchema);

  return posts;
}

async function createPost(post, user, getFollowers, getUsersByUsernames) {
  if (!user) throw new Error("Unauthorized");

  post.authorUserId = user.id;
  post.timestamp = new Date().toISOString();

  validateNewPost(post);

  const followers = await getFollowers(user.id);
  const followerUserIds = [...followers.map((f) => f.userId), user.id];

  const mentions = extractMentions(post.text);
  const mentionedUsers = await getUsersByUsernames(mentions, false);
  const mentionedUserIds = mentionedUsers.map((u) => String(u._id));

  const timelineUserIds = [
    ...new Set([...followerUserIds, ...mentionedUserIds]),
  ];

  // const hashtags = extractHashtagsWithIndices(post.text);
  // console.log(hashtags);

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
