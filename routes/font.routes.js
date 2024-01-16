const router = require("express").Router();
const Font = require("../models/Font.model.js")

// GET route for all the Fonts

router.get("/allFonts", async (req, res) => {
  const currentUserId = req.headers.currentuser;
  try {
    const fonts = await Font.find({ owner: currentUserId }).populate("owner");
    console.log("Users fonts", fonts);
    res.status(200).json(fonts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error with the Fonts" });
  }
});

// Create

router.post("/createfont", async (req, res, next) => {
  try {
    const response = await Font.create(req.body);
    res.json({
      status: 200,
      msg: "Font created successfully"
    })
  } catch (err) {
    console.log(err);
    res.json({
      status: 400,
      msg: "Font was not created successfully"
    });
  }
})

// Read

router.get("/:id", async (req, res) => {
  const currentUserId = req.headers.currentuser;
  try {
    const response = await Font.findById({ owner: currentUserId }).populate("owner");
    console.log("here is the font", response);
    res.json({
      status: 200,
      msg: "Font retreived",
      data: response,
    })
  } catch (error) {
    console.error(error);
    res.json({
      status: 400,
      msg: "Something is wrong with reading the font",
    });
  }
});

// Update

router.put("/updateFont/:id", async (req, res, next) => {
  try {
    const response = await Font.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      status: 200,
      msg: "Font updated successfully",
      data: response,
    })
  } catch (err) {
    res.json({
      status: 400,
      msg: "Error updating font",
    })
  }
})

// Delete

router.delete("/deleteFont/:id", async (req, res, next) => {
  try {
    const response = await Font.findByIdAndDelete(req.params.id);
    res.json({
      status: 200,
      msg: "Font has been deleted successfully",
      data: response,
    })
  } catch (err) {
    res.json({
      status: 400,
      msg: "Deleting Font failed",
    })
  }
})

module.exports = router;