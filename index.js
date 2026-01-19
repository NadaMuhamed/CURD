const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const CORS = require("cors");

const STATUS = require("./utils/httpStatusText");
const coursesRoutes = require("./Routes/coursesRoutes");

app.use(express.json());
app.use(CORS());

app.use("/", coursesRoutes);

// Global Error Handler (fixed)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || err.code || 500;

  res.status(statusCode).json({
    status: err.status || STATUS.ERROR,
    message: err.message || "Internal Server Error",
  });
});

const start = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("DB connection string not found");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    console.log("DB:", mongoose.connection.name);

    app.listen(port, () => {
      console.log(`app listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

start();

module.exports = app;