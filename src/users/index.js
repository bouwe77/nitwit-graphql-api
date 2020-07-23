import bcrypt from "bcrypt";
import validate from "validate.js";

import mapToUserSchema from "./mapping";
import User from "./model";

export const createUserFunctions = (user) => ({
  getUsers,
  getUser,
  getMe: () => getMe(user),
  createUser,
  deleteAllUsers,
  authenticateUser,
});

async function getUser(username, mapToSchema = true) {
  if (!username) throw Error("Please provide a username");

  const user = await User.findOne({ username: username.toLowerCase() });

  return mapToSchema ? mapToUserSchema(user) : user;
}

async function getMe(user) {
  if (!user) throw new Error("Unauthorized");
  return await getUser(user.username);
}

async function getUsers(limit) {
  const data = await User.find({});

  if (!limit) limit = data.length;

  const users = data.slice(0, limit).map(mapToUserSchema);

  return users;
}

async function createUser(user) {
  validateNewUser(user);

  user.username = user.username.toLowerCase();
  user.password = await bcrypt.hash(user.password, 12);

  const createdUser = await User.create(user);
  return mapToUserSchema(createdUser);
}

async function deleteAllUsers() {
  await User.deleteMany({}, (error) => console.log(error));
}

async function authenticateUser(username, password) {
  if (!isAuthenticationValid({ username, password })) return false;

  const user = await getUser(username, false);

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
      message: "must not be empty",
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters",
    },
  },
};

function validateNewUser(user) {
  const errors = validate(user, userConstraints, { format: "flat" });
  if (errors) throw new Error(errors.join(", "));
}

function isAuthenticationValid(user) {
  const errors = validate(user, userConstraints);
  return errors ? false : true;
}
