import { POSTS } from "./constants";
import { TIMELINEPOSTS } from "./constants";
import { USERS } from "./constants";
import { FOLLOWERS } from "./constants";

require("dotenv").config();

const mongoose = require("mongoose");

const uri = process.env.MONGODB_URL;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.error(`MongoDB connection error: ${err}`));

const db = mongoose.connection;

db.on("error", (error) => {
  console.error(`MongoDB error: ${error}`);
});

db.once("open", () => {
  // Workaround: To prevent the dreaded "Cannot create namespace in multi-document transaction" error
  // when inserting documents in a transaction to a collection that does not yet exist,
  // the collectiona are created here just to be sure.
  //
  // IMPORTANT: The server needs to be RESTARTED before a new connection is made and the collections are created!!!
  //
  mongoose.connection.createCollection(POSTS);
  mongoose.connection.createCollection(TIMELINEPOSTS);
  mongoose.connection.createCollection(USERS);
  mongoose.connection.createCollection(FOLLOWERS);

  console.log("🗂  MongoDB connected successfully");
});

module.exports = mongoose;
