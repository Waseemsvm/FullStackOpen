const User = require("../models/user");
const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3)
    return response
      .status(401)
      .send({ error: "password must be minimum 3 chars in length" });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).send(savedUser);
});

usersRouter.delete("/", async (request, response) => {});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", [
    "title",
    "author",
    "url",
  ]);
  response.json(users);
});

module.exports = usersRouter;
