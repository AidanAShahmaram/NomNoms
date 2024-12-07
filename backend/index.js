require('dotenv').config();

// Handling errors
const express = require('express');
const errorHandler = require('./errors.js');
const cors = require('cors');
const app = express();



app.use(cors({
    origin: "http://localhost:3000",
}));


//Request Body Reader
const bodyParser = require('body-parser');


// Using mongoDB

const mongoose = require('mongoose');

const mongoKey = process.env.MongoKey;

// Connect to MongoDB
const pass= 'SaxophoneDisco';
const url = `mongodb+srv://sacks:${mongoKey}@saxtest.vlggo.mongodb.net/?retryWrites=true&w=majority&appName=SAXTEST`;

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
const ratingRoutes = require('./routes/ratings');
app.use('/rating', ratingRoutes);
const commentRoutes = require('./routes/comments');
app.use('/comment', commentRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const A = require('./databases/ownerDatabase')
const B = require('./databases/restaurantDatabase')
const C = require('./databases/commentDatabase')
