const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");

const app = express();

const PORT = 3000;


/* --------------------------------
   Middleware
-------------------------------- */

app.use(cors());
app.use(express.json());

app.use(logger);


/* --------------------------------
   Content-Type Middleware
-------------------------------- */

app.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    if (!req.is("application/json")) {
      return res.status(400).json({
        error: "Content-Type must be application/json"
      });
    }
  }

  next();
});


/* --------------------------------
   Root route
-------------------------------- */

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Task Manager API is running",
    endpoints: {
      tasks: "/tasks"
    }
  });
});


/* --------------------------------
   Task routes
-------------------------------- */

app.use("/tasks", taskRoutes);


/* --------------------------------
   404 Handler
-------------------------------- */

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl
  });
});


/* --------------------------------
   Global Error Handler
-------------------------------- */

app.use(errorHandler);


/* --------------------------------
   MongoDB Connection + Server
-------------------------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:");
    console.error(err.message);
  });
