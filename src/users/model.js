const mongoose = require("../database");

const schema = {
  username: { type: mongoose.SchemaTypes.String, required: true },
  password: { type: mongoose.SchemaTypes.String, required: true },
};

const Model = mongoose.model("users", mongoose.Schema(schema));

export default Model;
