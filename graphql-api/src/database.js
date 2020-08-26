// Environment variables
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
  console.log("🗂  MongoDB connected successfully");
});

module.exports = mongoose;
