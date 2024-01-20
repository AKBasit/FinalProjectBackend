const router = require("express").Router();
const Webdesign = require("../models/Webdesign.model.js")

// GET all webdesigns
router.get("/", async (req, res) => {
  try {
    const webdesigns = await Webdesign.find({ shared: true }).populate("owner");
    console.log("All webdesigns", webdesigns);
    res.status(200).json(webdesigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error with the webdesigns" });
  }
});


// GET route for all the  user Webdesigns

router.get("/user", async (req, res) => {
  const currentUserId = req.headers.currentuser;
  try {
    const Webdesigns = await Webdesign.find({ owner: currentUserId }).populate("owner");
    console.log("Users web designs", Webdesigns);
    res.status(200).json(Webdesigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error with the web design" });
  }
});

// Create

router.post("/", async (req, res, next) => {
  try {
    const response = await Webdesign.create(req.body);
    res.json({
      status: 200,
      msg: "Webdesign created successfully"
    })
  } catch (err) {
    console.log(err);
    res.json({
      status: 400,
      msg: "Webdesign was not created successfully"
    });
  }
})

// Read

router.get("/:id", async (req, res) => {
  try {
    const webDesignId = req.params.id;
    const response = await Webdesign.findById(webDesignId);
    console.log("here is the web design", response);
    res.json({
      status: 200,
      msg: "Webdesign retreived",
      data: response,
    })
  } catch (error) {
    console.error(error);
    res.json({
      status: 400,
      msg: "Something is wrong with the web design",
    });
  }
});

// Update

router.put("/:id", async (req, res, next) => {
  try {
    const response = await Webdesign.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      status: 200,
      msg: "Webdesign updated successfully",
      data: response,
    })
  } catch (err) {
    res.json({
      status: 400,
      msg: "Error updating Webdesign",
    })
  }
})

// Delete

router.delete("/:id", async (req, res, next) => {
  try {
    const response = await Webdesign.findByIdAndDelete(req.params.id);
    res.json({
      status: 200,
      msg: "Webdesign has been deleted successfully",
      data: response,
    })
  } catch (err) {
    res.json({
      status: 400,
      msg: "Deleting Webdesign failed",
    })
  }
})

module.exports = router;