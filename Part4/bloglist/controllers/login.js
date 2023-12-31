const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  if (password.length < 3)
    return response.status(401).send({
      error: "password should be greater than 3 characters in length",
    });

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : bcrypt.compare(password, user.passwordHash);

  if (!user || !passwordCorrect) {
    response.status(401).send({ error: "invalid username or password" });
  }

  const userForToken = {
    username: username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response
    .status(200)
    .json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
