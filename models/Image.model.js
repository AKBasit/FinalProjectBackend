const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const imageSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    name: {
      type: String,
      required: [true, "Image name is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "web design image is required"], //
    },
    contributor: {
      type: String,
      // required: [true, "Image contributor is required"],
      trim: true,
    },
    shared: { type: Boolean, default: false },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Image = model("Image", imageSchema);

module.exports = Image;
