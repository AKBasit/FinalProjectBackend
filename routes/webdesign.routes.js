const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All routes");
});

module.exports = router;