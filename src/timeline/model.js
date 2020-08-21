const mongoose = require("../database");

const schema = {
  text: { type: mongoose.SchemaTypes.String, required: true },
  authorUserId: { type: mongoose.SchemaTypes.String, required: true },
  timelineUserId: { type: mongoose.SchemaTypes.String, required: true },
};

const Model = mongoose.model("timelineposts", mongoose.Schema(schema));

export default Model;
