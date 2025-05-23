// routes/index.js

const backend = require('express').Router();
const apiRoutes = require("./api/index.js");



//navigate to api/index.js file
backend.use("/api", apiRoutes);



//if no route matches
backend.use("/api", (req, res, next) => {
  const error = new Error("Route not found after /api.");
  error.status = 404;
  next(error);
});



//error handler
backend.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

module.exports = backend;
