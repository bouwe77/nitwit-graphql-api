import { USERS } from "../constants";

const mongoose = require("../database");

const schema = {
  username: { type: mongoose.SchemaTypes.String, required: true },
  password: { type: mongoose.SchemaTypes.String, required: true },
  name: { type: mongoose.SchemaTypes.String, required: true },
  bio: { type: mongoose.SchemaTypes.String, required: false },
  followerCount: { type: mongoose.SchemaTypes.Number },
  followingCount: { type: mongoose.SchemaTypes.Number },
};

const Model = mongoose.model(USERS, mongoose.Schema(schema));

export default Model;
