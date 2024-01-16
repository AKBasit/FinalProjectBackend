const router = require("express").Router();
const Image = require("../models/Image.model.js")

// GET route for all the Images

router.get("/allImages", async (req, res) => {
  const currentUserId = req.headers.currentuser;
  try {
    const images = await Image.find({ owner: currentUserId }).populate("owner");
    console.log("Users images", images);
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error with the images" });
  }
});

// Create

router.post("/createImage", async (req, res, next) => {
  try {
    const response = await Image.create(req.body);
    res.json({
      status: 200,
      msg: "Image created successfully"
    })
  } catch (err) {
    console.log(err);
    res.json({
      status: 400,
      msg: "Image was not created successfully"
    });
  }
})

// Read

router.get("/:id", async (req, res) => {
  try {
    const imageId = req.params.id;
    const response = await Image.findById(imageId);
    console.log("here is the Image", response);
    res.json({
      status: 200,
      msg: "Image retreived",
      data: response,
    })
  } catch (error) {
    console.error(error);
    res.json({
      status: 400,
      msg: "Something is wrong with the Image",
    });
  }
});


// Update

router.put("/updateImage/:id", async (req, res, next) => {
  try {
    const response = await Image.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      status: 200,
      msg: "Image updated successfully",
      data: response,
    })
  } catch (err) {
    res.json({
      status: 400,
      msg: "Error updating Image",
    })
  }
})

// Delete

router.delete("/deleteImage/:id", async (req, res, next) => {
  try {
    const response = await Image.findByIdAndDelete(req.params.id);
    res.json({
      status: 200,
      msg: "Image has been deleted successfully",
      data: response,
    })
  } catch (err) {
    res.json({
      status: 400,
      msg: "Deleting Image failed",
    })
  }
})

module.exports = router;