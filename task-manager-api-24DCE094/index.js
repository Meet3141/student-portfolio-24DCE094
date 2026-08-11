const express = require("express");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 5000;

/* -------------------------------
   Built-in JSON middleware
-------------------------------- */
app.use(express.json());

/* -------------------------------
   Logging Middleware
-------------------------------- */
app.use(logger);

/* -------------------------------
   Content-Type Middleware
   For POST and PUT
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

/* -------------------------------
   Routes
-------------------------------- */
app.use("/tasks", taskRoutes);

/* -------------------------------
   404 Handler
   Undefined routes
-------------------------------- */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl
  });
});

/* -------------------------------
   Global Error Handler
   MUST BE LAST
-------------------------------- */
app.use(errorHandler);

/* -------------------------------
   Start Server
-------------------------------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
