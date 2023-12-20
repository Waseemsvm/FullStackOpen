const listHelper = require("../utils/list_helper");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");

mongoose.set("bufferTimeoutMS", 30000);
const api = supertest(app);

let token;

beforeEach(async () => {
  logger.info("beforeEach started");
  await Blog.deleteMany({});
  await User.deleteMany({});

  let user = {
    username: "testuser",
    name: "testuser",
    password: "test",
  };

  logger.info("creating user", user);

  await api.post("/api/users").send(user);

  logger.info("user created");
  logger.info("logging in user", user);

  const obj = await api
    .post("/api/login")
    .set("Content-Type", "application/json")
    .send(user);
  token = obj.body.token;

  logger.info("user logged in ");

  logger.info("token generated", token);
  logger.info("initializing blogs", listHelper.initialBlogs);

  for (let oBlog of listHelper.initialBlogs) {
    // let blogObj = new Blog(oBlog);
    // await blogObj.save();

    await api
      .post("/api/blogs")
      .send(oBlog)
      .set("Authorization", `Bearer ${token}`);
  }

  logger.info("blogs initialization finished");

  logger.info("beforeEach ended");
}, 10000);

test("all blogs are returned in json format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-type", /application\/json/);

  let blogs = await listHelper.blogsInDb();
  expect(blogs).toHaveLength(listHelper.initialBlogs.length);
}, 6500);

test("all blogs have valid identifier id", async () => {
  const blogs = await listHelper.blogsInDb();
  for (let blog of blogs) {
    expect(blog.id).toBeDefined();
  }
});

test("a blog is created", async () => {
  const newBlog = {
    title: "This is a new Blog",
    author: "Waseem Akram P",
    url: "waseem",
    likes: 4,
  };

  // await api
  //   .post("/api/blogs")
  //   .set("Authorization", `Bearer ${token}`)
  //   .send(newBlog)
  //   .expect(201)
  //   .expect("Content-type", /application\/json/);

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${token}`);

  const blogsInEnd = await listHelper.blogsInDb();
  expect(blogsInEnd).toHaveLength(listHelper.initialBlogs.length + 1);

  const titles = blogsInEnd.map((blog) => blog.title);
  expect(titles).toContain("This is a new Blog");
}, 10000);

test("request contains like", () => {
  let newBlog = {
    title: "This is a new Blog",
    author: "Waseem Akram P",
  };

  expect(newBlog.likes).not.toBeDefined();
});

test("title or url properties are missing from the request", async () => {
  let newBlog = {
    author: "Waseem Akram P",
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
}, 6500);

test("delete a single blog post", async () => {
  let blogs = await listHelper.blogsInDb();
  let blogAtStart = blogs[0];
  await api
    .delete(`/api/blogs/${blogAtStart.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await listHelper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(listHelper.initialBlogs.length - 1);
}, 7000);

test("update a single blog post", async () => {
  let blogs = await listHelper.blogsInDb();
  let blogAtStart = blogs[0];

  await api.put(`/api/blogs/${blogAtStart.id}`).send({ likes: 1111 });
});

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  // const listWithOneBlog = [
  //     {
  //         _id: "5a422aa71b54a676234d17f8",
  //         title: "Go To Statement Considered Harmful",
  //         author: "Edsger W. Dijkstra",
  //         url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  //         likes: 5,
  //         __v: 0
  //     }
  // ]
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(
      /* listWithOneBlog */ listHelper.initialBlogs
    );
    expect(result).toBe(20);
  });
});

describe("favoriteBlog", () => {
  test("favoriteBlogTest", () => {
    const result = listHelper.favoriteBlog(listHelper.initialBlogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

test("authorWithMOstBlogs", () => {
  const result = listHelper.mostBlogs(listHelper.initialBlogs);
  expect(result).toEqual({
    author: "Edsger W. Dijkstra",
    blogs: 5,
  });
});

test("mostLikes", () => {
  const result = listHelper.mostLikes(listHelper.initialBlogs);
  expect(result).toEqual({
    author: "Edsger W. Dijkstra",
    likes: 12,
  });
});
