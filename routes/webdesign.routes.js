const router = require("express").Router();
const Webdesign = require("../models/Webdesign.model.js")

// GET route for all the Webdesigns

router.get("/allWebdesigns", async (req, res) => {
  const currentUserId = req.headers.currentuser;
  try {
    const Webdesigns = await Webdesign.find({ owner: currentUserId }).populate("owner");
    console.log("Users web designs", Webdesigns);
    res.status(200).json(Webdesigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create

router.post("/createWebdesign", async (req, res, next) => {
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
  const currentUserId = req.headers.currentuser;
  try {
    const response = await Webdesign.find({ owner: currentUserId }).populate("owner");
    console.log("here in the all web designs", response);
    res.json({
      status: 200,
      msg: "Webdesign retreived",
      data: response,
    })
  } catch (error) {
    console.error(error);
    res.json({
      status: 400,
      msg: "Something is wrong",
    });
  }
});

// Update

router.put("/updateWebdesign/:id", async (req, res, next) => {
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
      msg: "Something is wrong with the update",
    })
  }
})

// Delete

router.delete("/deleteWebdesign/:id", async (req, res, next) => {
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
      msg: "Something is wrong with the delete",
    })
  }
})

module.exports = router;