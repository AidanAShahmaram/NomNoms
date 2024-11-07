// routes for users

const express = require('express');
const router = express.Router();
const User = require('../databases/userDatabase');
const bcrypt = require('bcrypt');
const rounds = 10;


// Define a route
router.get('/', async(req, res) => {
    res.send('Users Page');// this gets executed when user visit http://localhost:3000/users
});

//GET user authentication
router.get('/login', async (req, res) => {
    const {user, password} = req.body;
    const passhash= await bcrypt.hash(password, rounds);
    //checks if account exists and password matches
    try {
        const account = await Data.find({username: user});
        if(account && account.password == password){
	    res.json({status: true, content: ""}); 
	} else {
	    res.json({status: false, constant: "User account does not exist"});
	}
    } catch (error) {
            res.json({ message: error.message });
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

