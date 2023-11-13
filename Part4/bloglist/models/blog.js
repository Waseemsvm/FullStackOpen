const logger = require("../utils/logger")
const config = require("../utils/config")
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema);
const mongoUrl = config.MONGODB_URI;

logger.info(`connecting to `, mongoUrl)

mongoose.connect(mongoUrl)
    .then(result => {
        logger.info("connected to mongodb")
    })
    .catch(error => {
        logger.error("error connecting to MongoDB", error.message)
    })

module.exports = Blog
