const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const fontSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      //   required: true,
    },
    name: {
      type: String,
      required: [true, "font name is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "web design image is required"], //
    },
    license: {
      type: String,
      required: [true, "font license is required"],
      trim: true,
    },
    shared: { type: Boolean, default: false },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Font = model("Font", fontSchema);

module.exports = Font;
