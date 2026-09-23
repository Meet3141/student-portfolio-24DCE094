const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  /* --------------------------------
     Mongoose Validation Error
  -------------------------------- */

  if (err.name === "ValidationError") {
    const errors = {};

    for (const field in err.errors) {
      errors[field] = err.errors[field].message;
    }

    return res.status(400).json({
      error: "Validation failed",
      details: errors
    });
  }


  /* --------------------------------
     Invalid MongoDB ObjectId
  -------------------------------- */

  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Invalid ID format"
    });
  }


  /* --------------------------------
     Default Error
  -------------------------------- */

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    error: err.message || "Something went wrong"
  });
};


module.exports = errorHandler;
