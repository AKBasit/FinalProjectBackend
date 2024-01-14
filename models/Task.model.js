const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const taskSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "task name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);

module.exports = Task;