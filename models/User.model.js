const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required."],
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "email is required."],
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required."],
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required"],
      unique: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;