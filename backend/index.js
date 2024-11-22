
// Handling errors
const express = require('express');
const errorHandler = require('./errors.js');

const app = express();

//Request Body Reader
const bodyParser = require('body-parser');


// Using mongoDB

const mongoose = require('mongoose');

// Connect to MongoDB
const pass= 'SaxophoneDisco';
const url = `mongodb+srv://sacks:${pass}@saxtest.vlggo.mongodb.net/?retryWrites=true&w=majority&appName=SAXTEST`;

console.log(pass, url);

mongoose.connect(url, {
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
const ownerRoutes = require('./routes/owners');
app.use('/data', ownerRoutes);
const userRoutes = require('./routes/users');
app.use('/user', userRoutes);
const entranceRoutes = require('./routes/entrance');
app.use('/entrance', entranceRoutes);

// Use the error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const A = require('./databases/ownerDatabase')
const B = require('./databases/restaurantDatabase')
const C = require('./databases/commentDatabase')
