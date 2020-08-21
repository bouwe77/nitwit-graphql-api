import validate from "validate.js";

import mapToPostSchema from "./mapping";
import Post from "./model";
import TimelinePost from "../timeline/model";

export const createPostFunctions = (user) => ({
  getPosts,
  createPost: (post) => createPost(post, user),
});

async function getPosts(authorUserId, limit) {
  const data = await Post.find({ authorUserId });

  if (!limit) limit = data.length;

  const posts = data.slice(0, limit).map(mapToPostSchema);

  return posts;
}

async function createPost(post, user) {
  if (!user) throw new Error("Unauthorized");

  post.authorUserId = user.id;

  validateNewPost(post);

  const createdPost = await Post.create(post);

  const timelinePost = { ...post, timelineUserId: user.id };
  await TimelinePost.create(timelinePost);

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
