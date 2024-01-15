const router = require("express").Router();
const Task = require("../../models/Task.model.js");
const isAuth = require("../../middlewares/isAuthenticated.middleware.js");
//a Get route for all the todos
router.get("/allTasks", async (req, res) => {
  const currentUserId = req.headers.currentuser;
  try {
    const tasks = await Task.find({ owner: currentUserId }).populate("owner");
    console.log("here in the all tasks", tasks);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//a post route for creating a new todo
router.post("/createTask", async (req, res) => {
  try {
    const { owner, name, description } = req.body;
    const task = new Task({
      owner,
      name,
      description,
      done: false,
    });

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//a patch route for updating a todo
router.patch("/updateTask/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { name, description, done } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { name, description, done },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updatedTask);
  } catch (err) {
    console.log("there was an error on the update route");
    res.status(500).json({ error: "server error" });
  }
});

//a delete route for deleting a todo
router.delete("/deleteTask/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task has been deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
