const mongoose = require("../database");

const schema = {
  userId: { type: mongoose.SchemaTypes.String, required: true },
  followingUserId: { type: mongoose.SchemaTypes.String, required: true },
};

const Model = mongoose.model("followers", mongoose.Schema(schema));

export default Model;
