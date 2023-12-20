const Blog = require("../models/blog")
const logger = require("../utils/logger")

const dummy = (/* blogs */) => {
    return 1
}

let initialBlogs = [{
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12,
    blogs: 5
},
{
    title: "Canonical reduction",
    author: "Robert C. Martin",
    likes: 3,
    blogs: 3
},
{
    title: "string reduction",
    author: "Edsger W. Dijkstra",
    likes: 5,
    blogs: 1
}]


const totalLikes = (bloglist = []) => {
    return bloglist.reduce((acc, blog) => { return acc + blog.likes }, 0)
}

const favoriteBlog = (bloglist = []) => {
    logger.info("favoriteBlog ---------------", bloglist)

    if (!bloglist.length) return bloglist

    if (bloglist.length === 1) return bloglist[0]

    let favoriteBlog = bloglist[0]
    for (let i = 0; i < bloglist.length - 1; i++) {
        logger.info(bloglist[i + 1].likes, bloglist[i].likes)
        if (favoriteBlog.likes < bloglist[i + 1].likes) {
            favoriteBlog = bloglist[i + 1]
        }

    }

    logger.info("favoriteBlog : ", favoriteBlog)

    return { title: favoriteBlog.title, author: favoriteBlog.author, likes: favoriteBlog.likes }
}

const mostBlogs = (bloglist = []) => {
    if (!bloglist.length) return bloglist

    if (bloglist.length === 1) return bloglist[0]

    let finalAuthor = bloglist[0]

    for (let i = 0; i < bloglist.length - 1; i++) {
        if (bloglist[i + 1].blogs > bloglist[i].blogs) {
            finalAuthor = bloglist[i + 1]
        }
    }
    // return finalAuthor
    return { author: finalAuthor.author, blogs: finalAuthor.blogs }
}

const mostLikes = (bloglist) => {
    if (!bloglist.length) return bloglist

    if (bloglist.length === 1) return bloglist[0]

    let favoriteBlog = bloglist[0]
    for (let i = 0; i < bloglist.length - 1; i++) {
        logger.info(bloglist[i + 1].likes, bloglist[i].likes)
        if (favoriteBlog.likes < bloglist[i + 1].likes) {
            favoriteBlog = bloglist[i + 1]
        }
    }
    return { author: favoriteBlog.author, likes: favoriteBlog.likes }
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    initialBlogs,
    blogsInDb
}