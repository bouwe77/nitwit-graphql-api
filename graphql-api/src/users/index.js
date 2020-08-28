import bcrypt from "bcrypt";
import validate from "validate.js";
import mongoose from "mongoose";

import mapToUserSchema from "./mapping";
import User from "./model";

export const createUserFunctions = (user) => ({
  getUsers,
  getUser,
  getUserByUsername,
  getUsersByUsernames,
  getMe: () => getMe(user),
  createUser,
  updateFollowerCount,
  updateFollowingCount,
  deleteAllUsers,
  authenticateUser,
});

async function getUser(userId, mapToSchema = true) {
  if (!userId) throw Error("Please provide a userId");

  const idSeemsValid = mongoose.Types.ObjectId.isValid(userId);
  if (!idSeemsValid) return null;

  const user = await User.findById(userId);

  return mapToSchema ? mapToUserSchema(user) : user;
}

async function getUserByUsername(username, mapToSchema = true) {
  if (!username) throw Error("Please provide a username");

  const user = await User.findOne({ username });

  return mapToSchema ? mapToUserSchema(user) : user;
}

async function getUsersByUsernames(usernames, mapToSchema = true) {
  const users = await User.find().where("username").in(usernames).exec();

  return mapToSchema ? users.map(mapToUserSchema) : users;
}

async function getMe(user) {
  if (!user) throw new Error("Unauthorized");
  return await getUserByUsername(user.username);
}

async function getUsers(skip, limit) {
  if (!limit) limit = 100;
  if (!skip) skip = 0;

  const data = await User.find({}).skip(skip).limit(limit);

  const users = data.map(mapToUserSchema);

  return users;
}

async function createUser(user) {
  validateNewUser(user);

  user.username = user.username.toLowerCase();
  user.password = await bcrypt.hash(user.password, 12);

  const createdUser = await User.create(user);
  return mapToUserSchema(createdUser);
}

async function updateFollowingCount(userId, session = null, increase = true) {
  const user = await getUser(userId);
  if (!user) throw new Error("User not found");

  let followingCount = user.followingCount + 1;
  if (!increase) followingCount = user.followingCount - 1;

  if (session)
    await User.updateOne({ _id: userId }, { followingCount }, { session });
  else await User.updateOne({ _id: userId }, { followingCount });
}

async function updateFollowerCount(userId, session = null, increase = true) {
  const user = await getUser(userId);
  if (!user) throw new Error("User not found");

  let followerCount = user.followerCount + 1;
  if (!increase) followerCount = user.followerCount - 1;

  if (session)
    await User.updateOne({ _id: userId }, { followerCount }, { session });
  else await User.updateOne({ _id: userId }, { followerCount });
}

async function deleteAllUsers() {
  await User.deleteMany({}, (error) => console.log(error));
}

async function authenticateUser(username, password) {
  if (!isAuthenticationValid({ username, password })) return false;

  const user = await getUserByUsername(username, false);

  if (!user) return false;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return false;

  return user;
}

const userConstraints = {
  username: {
    presence: true,
    length: {
      minimum: 1,
      maximum: 100,
      message: "must be between 1 and 100 characters",
    },
    format: {
      pattern: "^[0-9a-zA-Z]$",
      message: "can have alphanumeric characters only",
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      maximum: 100,
      message: "must be between 6 and 100 characters",
    },
  },
};

function validateNewUser(user) {
  const errors = validate(user, userConstraints, { format: "flat" });
  if (errors) throw new Error(errors.join(", "));
}

function isAuthenticationValid(user) {
  // Note that (for now) the validation constraints are the same as when registering a new user.
  const errors = validate(user, userConstraints);
  return errors ? false : true;
}
