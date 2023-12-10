const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", ["username", "name"]);
  response.json(blogs);
});

// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.startsWith("Bearer ")) {
//     return authorization.replace("Bearer ", "");
//   }
//   return null;
// };

blogsRouter.post("/", middleware.tokenExtractor, async (request, response) => {
  // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  // if (!request.token)
  //   return response.status(401).json({ error: "token invalid" });
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  if (!(request.body.title && request.body.url)) response.status(400).end();

  // const blog = new Blog(request.body);
  const blog = new Blog({
    author: request.body.author,
    likes: request.body.likes,
    title: request.body.title,
    url: request.body.url,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  async (request, response) => {
    // if (!request.token)
    //   return response.status(401).send({ error: "token invalid" });
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);

    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).send({ error: "invalid token" });
    }
    await blog.remove();

    let blogsOfCurrentUser = await (
      await Blog.find({ user: user.id.toString() })
    ).map((b) => b.id);

    user.blogs = blogsOfCurrentUser;
    await user.save();

    response.status(204).end();
  }
);

blogsRouter.put("/:id", async (request, response) => {
  const blog = {
    likes: request.body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog);
  response.json(updatedBlog);
});

module.exports = blogsRouter;
