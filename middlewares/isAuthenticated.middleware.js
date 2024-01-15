const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token = req.header.authorization.split(" ")[1];
    let decode;
    !token && !token.length > 0
      ? res.json({ message: "not logged in" })
      : next();

    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    res.status(202).json({ token: verify.id });
  } catch (err) {
    res.json({ errorMessage: err });
  }
};
module.exports = isAuth;
