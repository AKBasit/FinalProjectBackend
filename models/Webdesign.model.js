const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const webdesignSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      //required: true,//
    },
    name: {
      type: String,
      required: [true, "web design name is required"],
      trim: true,
    },
    image: {
      type: String,
      //required: [true, "web design image is required"],//
    },
    description: {
      type: String,
      required: [true, "web design description is required"],
      trim: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Webdesign = model("Webdesign", webdesignSchema);

module.exports = Webdesign;