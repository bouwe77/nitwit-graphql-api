import { TIMELINEPOSTS } from "../constants";

const mongoose = require("../database");

const schema = {
  text: { type: mongoose.SchemaTypes.String, required: true },
  authorUserId: { type: mongoose.SchemaTypes.String, required: true },
  timelineUserId: { type: mongoose.SchemaTypes.String, required: true },
  timestamp: { type: mongoose.SchemaTypes.String, required: true },
};

const Model = mongoose.model(TIMELINEPOSTS, mongoose.Schema(schema));

export default Model;
