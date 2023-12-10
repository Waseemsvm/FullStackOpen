const logger = require("../utils/logger");
const config = require("../utils/config");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const mongoUrl = config.MONGODB_URI;

logger.info("connecting to ", mongoUrl);

mongoose
  .connect(mongoUrl)
  .then((/* result */) => {
    logger.info("connected to mongodb");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message);
  });

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
