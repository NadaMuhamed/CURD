const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT ||8080;
const mongoose = require('mongoose');


app.use(express.json());
const coursesRoutes = require('./Routes/coursesRoutes');
app.use('/', coursesRoutes);

const start = async () => {
    try {
      if (!process.env.MONGODB_URI) {
        throw new Error('DB connection string not found');
      }
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
  
      app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error.message);
      process.exit(1);
    }
  };
  
  start();

module.exports = app;