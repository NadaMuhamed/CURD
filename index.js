const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT ||8080;
const mongoose = require('mongoose');
const CORS = require('cors');

app.use(express.json());
app.use(CORS());
const coursesRoutes = require('./Routes/coursesRoutes');
app.use('/', coursesRoutes);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({status: 'ERROR', message: err.message || 'Internal Server Error'});
});

const start = async () => {
    try {
      if (!process.env.MONGODB_URI) {
        throw new Error('DB connection string not found');
      }
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
      console.log("DB:", mongoose.connection.name);

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