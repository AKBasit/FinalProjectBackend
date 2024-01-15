const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const fontSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "font name is required"],
      trim: true,
    },
    image: {
      type: Image,
      required: [true, "font image is required"],
    },
    description: {
      type: String,
      required: [true, "font description is required"],
      trim: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Font = model("Font", fontSchema);

module.exports = Font;