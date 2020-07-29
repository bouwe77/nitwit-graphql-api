import validate from "validate.js";

import mapToPostSchema from "./mapping";
import Post from "./model";

export const createPostFunctions = (user) => ({
  getPosts,
  getTimeline: (limit) => getTimeline(user, limit),
  createPost: (post) => createPost(post, user),
});

async function getPosts(authorUserId, limit) {
  const data = await Post.find({ authorUserId });

  if (!limit) limit = data.length;

  const posts = data.slice(0, limit).map(mapToPostSchema);

  return posts;
}

async function getTimeline(user, limit) {
  if (!user) throw new Error("Unauthorized");

  // For now, return the posts of the user.
  //TODO Create a timeline collection
  return await getPosts(user.id, limit);
}

async function createPost(post, user) {
  if (!user) throw new Error("Unauthorized");

  post.authorUserId = user.id;

  validateNewPost(post);

  const createdPost = await Post.create(post);

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
