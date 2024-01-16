const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const imageSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Image name is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    contributor: {
      type: String,
      required: [true, "Image contributor is required"],
      trim: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Image = model("Image", imageSchema);

module.exports = Image;