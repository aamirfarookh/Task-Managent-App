const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../Controllers/task_controllers");

const taskRouter = express.Router();

taskRouter.post("/create",createTask);
taskRouter.get("/all-tasks",getTasks);
taskRouter.patch("/:taskId",updateTask);
taskRouter.delete("/:taskId",deleteTask);

module.exports = {taskRouter};