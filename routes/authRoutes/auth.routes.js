const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/User.model");
const jwt = require("jsonwebtoken");
const router = express.Router();
const saltRounds = 12;
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;
    const dataCheck = await User.findOne({ email });
    if (!dataCheck) {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPass = await bcrypt.hash(password, salt);
      console.log(hashPass);

      const user = new User({
        username,
        email,
        password: hashPass,
        phoneNumber,
      });
      await user.save();
      res.status(201).json({ message: "user created" });
      console.log(`new user ${username}`);
    } else {
      res.json({ message: "user already exists " });
    }
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
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
