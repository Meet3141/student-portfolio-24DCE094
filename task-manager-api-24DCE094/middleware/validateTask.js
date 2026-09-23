// Basic validation middleware for tasks
const validateTask = (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    if (req.body && typeof req.body.title !== 'undefined' && req.body.title.trim() === "") {
      return res.status(400).json({
        error: "Validation failed",
        details: { title: "Title cannot be empty" }
      });
    }
  }
  next();
};

module.exports = validateTask;
