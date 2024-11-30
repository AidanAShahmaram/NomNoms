// routes for rating creation and retrieval

const express = require('express');
const router = express.Router();
const Restaurant = require('../databases/restaurantDatabase');

const decodeToken = require('../token_middleware.js')

//gets the average rating for the given restaurant id
router.get('/$(id)/average_rating',async (req, res) => {
    restaurant_id = req.params.id;
    
    //finds restaurant
    const restaurant = await Restaurant.findOne({ _id: restaurant_id});
    if(!restaurant){
	return res.status(401).json({msg: "restaurant not found"});
    }

    const total = restaurant.rating_total;
    const count = restaurant.rating_count;

    //if there are no ratings yet, 0 will be returned
    if(!count){
	return res.status(200).json({rating: 0});
    }

    //gets rating to first decimal
    const result = (total/count).toFixed(1);

    return res.status(200).json({rating: result});
});

//creates or changes a rating made by a user
router.post('/$(id)/user_rating',decodeToken, async (req, res) => {
    const {username, newRating} = req.body;
    restaurant_id = req.params.id;

    //finds restaurant
    const restaurant = await Restaurant.findOne({ _id: restaurant_id});
    if(!restaurant){
	return res.status(404).json({msg: "restaurant not found"});
    }

    //checks for existing rating made by user
    if(restaurant.ratings.has(username)){
	old_rating  = restaurant.ratings.get(username);
	restaurant.rating_total = restaurant.rating_total - old_rating;
	restaurant.rating_count = restaurant.rating_count - 1;
    }

    //updates restaurant ratings
    restaurant.rating_total = restaurant.rating_total + newRating;
    restaurant.rating_count = restaurant.rating_count + 1;
    restaurant.ratings.set(username, newRating);

    await restaurant.save();

    res.status(200).json({ msg: "Rating Sucessfully Updated!" });

});

router.get('/$(id)/user_rating', async (req, res) => {
     const {username} = req.body;
    restaurant_id = req.params.id;

    if(!username){
	return res.status(400).json({msg: "username is required"});
    }

    //finds restaurant
    const restaurant = await Restaurant.findOne({ _id: restaurant_id});
    if(!restaurant){
	return res.status(404).json({msg: "restaurant not found"});
    }

    if(restaurant.ratings.has(username)){
	user_rating = restaurant.ratings.get(username);
	return res.status(200).json({ rating: user_rating});
    }

    return res.status(404).json({ msg: "given user has not made a rating"})
});



module.exports = router
