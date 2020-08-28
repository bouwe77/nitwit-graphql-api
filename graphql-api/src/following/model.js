import { FOLLOWERS } from "../constants";

const mongoose = require("../database");

const schema = {
  userId: { type: mongoose.SchemaTypes.String, required: true },
  followingUserId: { type: mongoose.SchemaTypes.String, required: true },
};

const Model = mongoose.model(FOLLOWERS, mongoose.Schema(schema));

export default Model;
