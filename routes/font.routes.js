const router = require("express").Router();
const Font = require("../models/Font.model.js");
const fileUploader = require("../config/cloudinary.config");

// GET all fonts
router.get("/", async (req, res) => {
  try {
    const fonts = await Font.find({ shared: true }).populate("owner");
    console.log("All fonts", fonts);
    res.status(200).json(fonts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error with the fonts" });
  }
});

// GET route for all the user Fonts

router.get("/user", async (req, res) => {
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

// Create uploader for Fonts

router.post(
  "/upload",
  fileUploader.single("imageUrl"),
  async (req, res, next) => {
    if (!req.file) {
      next(new Error("No fontfile uploaded!"));
      res.json({
        status: 400,
        msg: "Font was not created successfully to the upload",
      });
    }
    res.json({ fileUrl: req.file.path });
    try {
      const response = await Font.create(req.body);
      res.json({
        status: 200,
        msg: "Font created successfully",
      });
    } catch (err) {}
  }
);

//  Add uploaded Font to database
router.post("/", async (req, res) => {
  console.log(req.files);
  console.log(req.body);
  try {
    const createFont = await Font.create(req.body);
    res.status(200).json(createFont);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 400,
      msg: "Font was not created successfully",
    });
  }
});

// Read

router.get("/:id", async (req, res) => {
  try {
    const fontId = req.params.id;
    const response = await Font.findById(fontId);
    console.log("here is the Font", response);
    res.json({
      status: 200,
      msg: "Font retreived",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 400,
      msg: "Something is wrong with the Font",
    });
  }
});

// Update

router.put("/:id", async (req, res, next) => {
  try {
    const response = await Font.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      status: 200,
      msg: "Font updated successfully",
      data: response,
    });
  } catch (err) {
    res.json({
      status: 400,
      msg: "Error updating font",
    });
  }
});

// Delete

router.delete("/:id", async (req, res, next) => {
  try {
    const response = await Font.findByIdAndDelete(req.params.id);
    res.json({
      status: 200,
      msg: "Font has been deleted successfully",
      data: response,
    });
  } catch (err) {
    res.json({
      status: 400,
      msg: "Deleting Font failed",
    });
  }
});

module.exports = router;
