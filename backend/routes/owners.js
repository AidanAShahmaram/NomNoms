// routes/products.js
const express = require('express');
const router = express.Router();
const ownerInfo = require('../databases/ownerDatabase');
const restaurantInfo = require('../databases/restaurantDatabase');
const jwt = require('jsonwebtoken'); //Don't think we need this here (?)

const decodeToken = require('../token_middleware.js');

// Define a route
router.get('/', async(req, res) => {
    res.send('Restaurant Owners Page');// this gets executed when user visit http://localhost:3000/owners
});

router.get('/login', async (req, res) => {
    res.send('Restaurant Owners Login');// this gets executed when user visit http://localhost:3000/owners/login
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
  

router.get('/view_restaurants', async (req, res) => {
    res.send('View your restaurants');// this gets executed when user visit http://localhost:3000/owners/restaurant_mods
    try {
        const allData = await ownerInfo.find();
        res.json(ownerInfo.restaurants);
        //Can mod so vals get sent out in a different format if that's easier
      } catch (error) {
        res.json({ message: "No restaurants found"});
      }

});

// POST new data
//Same page for viewing + modifying?
router.post('/view_restaurants', decodeToken, async (req, res) => {
  try {
    const newRestaurant = new restaurantInfo({
      name: req.body.name,
      address: req.body.address,
      image: req.body.address,
      website: req.body.website, 
      tags: req.body.tags,
      description: req.body.description});

    const restaurantSaved = await newRestaurant.save(); //adding to restaurant database

    //pulling owner info so that we can add restauarant to it
    //NOTE: _id automatically created by every mongo database
    const owner = await ownerInfo.findOne({_id: req.owner_token});
    if(!owner){
      return res.json({message: "Owner not attached to this token"});
    }
    //adding restaurant
    owner.restaurants.push(restaurantSaved._id);
    await owner.save(); //need await so owner is fully modified before proceeding

    res.json({message: "Restaurant added"});
  } catch (error){
    res.json({ message: error.message });
  }
});

// PUT update data -> modifying a restaurant's values
router.put('/modify_restaurant/:restaurantId', decodeToken, async (req, res) => {
  //restaurantId should be a string here (same as the string MongoDB would store for the restaurant)
  //NOT the same as "._id"
  try {
    const {restaurantId} = req.params; //pull Id from the URL -> FIGURE OUT HOW TO GET URL TO GIVE THIS
    const owner = await ownerInfo.findById(req.owner_token); //find the owner using token
    if (!owner){
      return res.status(404).json({message: "Owner not found"});
    }
    const isRightRestaurant = owner.restaurants.some((restaurant) => restaurant.toString() == restaurantId);
    //checks if owner accessing their own restaurant
    //.some() checks whether at least one element in array passes the test (aka having that id)
    if (!isRightRestaurant){ 
      return res.status(403).json({message: "You don't own this restaurant"});
    }
    const updatedData = await restaurantInfo.findByIdAndUpdate(restaurantId)(
      { $set: req.body }, //will merge old values with new changes
      {new: true} //returns new values instead of old
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

