const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
