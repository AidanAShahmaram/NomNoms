// routes for users

const express = require('express');
const router = express.Router();
const Data = require('../databases/userDatabase');

// Define a route
router.get('/', async(req, res) => {
    res.send('Users Page');// this gets executed when user visit http://localhost:3000/users
});

router.get('/login', async (req, res) => {
    res.send('Users please login here');// this gets executed when user visit http://localhost:3000/users/login
    // GET all data
    try {
            const allData = await Data.find();
            res.json(allData);
        } catch (error) {
            res.json({ message: error.message });
        }
});

// POST new data
router.post('/login', async (req, res) => {
    const newData = new Data(req.body);
    try {
      const savedData = await newData.save();
      res.json(savedData);
    } catch (error) {
      res.json({ message: error.message });
    }
  });
  

router.get('/restaurants', async (req, res) => {
    res.send('View restaurants here');// this gets executed when user visit http://localhost:3000/users/restaurants
});



// PUT update data
router.put('/:id', async (req, res) => {
  try {
    const updatedData = await Data.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updatedData);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// DELETE data
router.delete('/:id', async (req, res) => {
  try {
    const removedData = await Data.deleteOne({ _id: req.params.id });
    res.json(removedData);
  } catch (error) {
    res.json({ message: error.message });
  }
});


// export the router module so that server.js file can use it
module.exports = router;

