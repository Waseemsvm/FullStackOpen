const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

loginRouter.post("/", async (request, response) => {
  logger.info(request.body);
  const { username, password } = request.body;

  if (password.length < 3)
    return response.status(401).send({
      error: "password should be greater than 3 characters in length",
    });

  logger.info("finding user with name", username);
  const user = await User.findOne({ username });
  logger.info("found user");
  logger.info("comparing passwords");
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  logger.info("passwordCorrect", passwordCorrect);

  if (!(user && passwordCorrect)) {
    return response.status(401).send({ error: "invalid username or password" });
  }

  const userForToken = {
    username: username,
    id: user._id,
  };
  logger.info("userForToken", userForToken);

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  logger.info("token", token);

  response
    .status(200)
    .json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
