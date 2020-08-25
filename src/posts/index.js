import validate from "validate.js";

import mapToPostSchema from "./mapping";
import Post from "./model";
import TimelinePost from "../timeline/model";

export const createPostFunctions = (user) => ({
  getPosts,
  createPost: (post, getFollowers) => createPost(post, user, getFollowers),
});

async function getPosts(authorUserId, limit) {
  const data = await Post.find({ authorUserId });

  if (!limit) limit = data.length;

  const posts = data.slice(0, limit).map(mapToPostSchema);

  return posts;
}

async function createPost(post, user, getFollowers) {
  if (!user) throw new Error("Unauthorized");

  post.authorUserId = user.id;

  validateNewPost(post);

  const followers = await getFollowers(user.id);
  const followerUserIds = [...followers.map((f) => f.userId), user.id];
  console.log(user.id, followerUserIds);

  const createdPost = await createPostInTransaction(post, followerUserIds);

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
async function createPostInTransaction(post, followerUserIds) {
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

      // Also create the same post on the timelines of the author and all followers.
      const timelinePosts = followerUserIds.map((userId) => {
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
