const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/User.model");
const jwt = require("jsonwebtoken");
const router = express.Router();
const saltRounds = 10;

router.post("/signup", (req, res, next) => {
  const { email, password, username } = req.body;

  // Check if email or password or name are provided as empty strings
  if (email === "" || password === "" || username === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return User.create({ email, password: hashedPassword, username });
    })
    .then((createdUser) => {
      const { email, username, _id } = createdUser;

      // Create a new object that doesn't expose the password
      const user = { email, username, _id };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); // error handling middleware.
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ message: "user does not exist" });
    }
    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) {
      res.json({ message: "password not correct" });
    }

    const jwtToken = jwt.sign(
      { email: user.email, id: user.id, username: user.username },
      process.env.TOKEN_SECRET,
      { algorithm: "HS256", expiresIn: "6h" }
    );
    res.status(200).json({ name: user.username, token: jwtToken });
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/verify", (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("the verify route", token);
    if (!token) {
      res.status(403).json({ message: "not logged in" });
    }

    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("verify", verify);
    res.status(202).json(verify);
  } catch (err) {
    res.json({ errorMessage: err });
  }
});
module.exports = router;
