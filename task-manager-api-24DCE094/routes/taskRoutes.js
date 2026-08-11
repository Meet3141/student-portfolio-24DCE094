const express = require("express");
const router = express.Router();

/* -------------------------------
   In-memory task storage
-------------------------------- */
let tasks = [
  {
    id: 1,
    title: "Complete React Practical",
    completed: true
  },
  {
    id: 2,
    title: "Build Express REST API",
    completed: false
  }
];

let nextId = 3;

/* -------------------------------
   ID Validation Middleware
-------------------------------- */
function validateTaskId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Task ID must be a positive integer"
    });
  }

  next();
}

/* -------------------------------
   GET /tasks
   Get all tasks
-------------------------------- */
router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

/* -------------------------------
   GET /tasks/:id
   Get one task
-------------------------------- */
router.get("/:id", validateTaskId, (req, res, next) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    const error = new Error("Task not found");
    error.status = 404;
    return next(error);
  }

  res.status(200).json(task);
});

/* -------------------------------
   POST /tasks
   Create a new task
-------------------------------- */
router.post("/", (req, res, next) => {
  const { title, completed = false } = req.body;

  if (!title || typeof title !== "string") {
    const error = new Error("Title is required and must be a string");
    error.status = 400;
    return next(error);
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: Boolean(completed)
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

/* -------------------------------
   PUT /tasks/:id
   Update a task
-------------------------------- */
router.put("/:id", validateTaskId, (req, res, next) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    const error = new Error("Task not found");
    error.status = 404;
    return next(error);
  }

  const { title, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      const error = new Error("Title must be a non-empty string");
      error.status = 400;
      return next(error);
    }
    task.title = title.trim();
  }

  if (completed !== undefined) {
    task.completed = Boolean(completed);
  }

  res.status(200).json(task);
});

/* -------------------------------
   DELETE /tasks/:id
   Delete a task
-------------------------------- */
router.delete("/:id", validateTaskId, (req, res, next) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    const error = new Error("Task not found");
    error.status = 404;
    return next(error);
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.status(200).json({
    message: "Task deleted successfully",
    task: deletedTask
  });
});

module.exports = router;
