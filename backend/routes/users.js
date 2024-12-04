// routes for users

const express = require('express');
const router = express.Router();
const User = require('../databases/userDatabase');
const jwt = require('bcrypt');
const bcrypt = require('bcrypt');
const restaurantInfo = require('../databases/restaurantDatabase');
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

    const validPass = bcrypt.compare(password, account.password);

    if(validPass){
	res.status(200).json({content: "Success"}); 
    } else {
	res.status(401).json({content: "Incorrect Password"});
    }
});

// POST user sign up
router.post('/signup', async (req, res) => {
    try {
	const {username, password, description} = req.body;
	const passhash = await bcrypt.hash(password, rounds);
	const newData = new User({"username": username, "password": passhash, "description": description});
	const savedData = await newData.save();
	res.json(savedData);
    } catch (error) {
	res.json({ message: error.message });
    }
    
  });
  
//live searching: (search via name)
router.post('/routes/users/search', async(req, res) => {
  let payload = req.body.payload.trim();
  //check
  console.log(payload);
  //the i flag means its case insensitive
  let search = await liveSearch.find({name: {$regex: new RegExp('^'+payload+'.*','i')}}).exec();
  res.send({payload:search});
})

//use sends us to a filter url

router.use('/restaurants_filter', async (req, res, next) => { //Page for searching/filtering
  
  const filters = req.query.tags ? req.query.tags.split(',') : []; 
  //get user input in key-value pairs and turn into an array of tags
  if (filters.length == 0){
    return res.status(400).json({error: "No tags provided"});
  }
  const query = {
      tags: { $in: filters} //$all means we need all tags to be included
      //$in looks for values in the same field (like here, where all values are tags)
      //Meanwhile $or is for different fields
  }
  //.find is a database query function so should be good 
  const filteredRestaurants = await restaurantInfo.find(query);
  if((await restaurantInfo.find(query)) === 0){
    console.log("No restaurants found");
  }
  //Check:
  for await (const doc of filteredRestaurants){
    console.dir(doc);
  }
  res.json( filteredRestaurants /*{content: "processing"}*/); //sends as json file
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

