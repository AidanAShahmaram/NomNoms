// Handling errors
const express = require('express');
const errorHandler = require('./errors.js');

const app = express();


// Using mongoDB

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/mern_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
  });

// Middleware for routes related to data
const ownerRoutes = require('./routes/owners');
app.use('/data', ownerRoutes);
const userRoutes = require('./routes/users');
app.use('/data', userRoutes);

// Use the error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});