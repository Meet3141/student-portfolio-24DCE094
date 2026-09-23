const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Task = require("../models/Task");


/* --------------------------------
   ID Validation Middleware
-------------------------------- */

function validateTaskId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "Invalid task ID"
    });
  }

  next();
}


/* --------------------------------
   GET /tasks
   Get all tasks
-------------------------------- */

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    next(err);
  }
});


/* --------------------------------
   GET /tasks/:id
   Get one task
-------------------------------- */

router.get(
  "/:id",
  validateTaskId,
  async (req, res, next) => {
    try {
      const task = await Task.findById(req.params.id);

      if (!task) {
        const error = new Error("Task not found");
        error.status = 404;

        return next(error);
      }

      res.status(200).json({
        success: true,
        data: task
      });
    } catch (err) {
      next(err);
    }
  }
);


/* --------------------------------
   POST /tasks
   Create task
-------------------------------- */

router.post("/", async (req, res, next) => {
  try {
    const {
      title,
      description,
      completed,
      priority
    } = req.body;

    const task = await Task.create({
      title,
      description,
      completed,
      priority
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });
  } catch (err) {
    next(err);
  }
});


/* --------------------------------
   PUT /tasks/:id
   Update task
-------------------------------- */

router.put(
  "/:id",
  validateTaskId,
  async (req, res, next) => {
    try {
      const task = await Task.findById(req.params.id);

      if (!task) {
        const error = new Error("Task not found");
        error.status = 404;

        return next(error);
      }

      const {
        title,
        description,
        completed,
        priority
      } = req.body;

      if (title !== undefined) {
        task.title = title;
      }

      if (description !== undefined) {
        task.description = description;
      }

      if (completed !== undefined) {
        task.completed = completed;
      }

      if (priority !== undefined) {
        task.priority = priority;
      }

      await task.save();

      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: task
      });
    } catch (err) {
      next(err);
    }
  }
);


/* --------------------------------
   DELETE /tasks/:id
   Delete task
-------------------------------- */

router.delete(
  "/:id",
  validateTaskId,
  async (req, res, next) => {
    try {
      const task = await Task.findByIdAndDelete(
        req.params.id
      );

      if (!task) {
        const error = new Error("Task not found");
        error.status = 404;

        return next(error);
      }

      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: task
      });
    } catch (err) {
      next(err);
    }
  }
);


module.exports = router;
