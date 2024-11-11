// routes for users

const express = require('express');
const router = express.Router();
const User = require('../databases/userDatabase');
const jwt = require('bcrypt');
const bcrypt = require('bcrypt');
const rounds = 10;


// Define a route
router.get('/', async(req, res) => {
    res.send('Users Page');// this gets executed when user visit http://localhost:3000/users
});

//GET user authentication
//status codes: 200 - success, 400 - username not found, 401 - passwords does not match
router.get('/login', async (req, res) => {
    const {user, password} = req.body;
    
    //checks if account exists
    const account = await Data.find({username: user});
    if(!account)
	return res.status(400).json({msg: "Invalid Username"});

    const validPass = bcrypt.comare(password, account.password);

    if(validPass){
	res.status(200).json({content: "Success"}); 
    } else {
	res.status(401).json({content: "Incorrect Password"});
    }
});

// POST user sign up
router.post('/signup', async (req, res) => {
    try {
	const {user, password, description} = req.body;
	const passhash = await bcrypt.hash(password, rounds);
	const newData = new User({"username": user, "password": passhash, "description": description});
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

