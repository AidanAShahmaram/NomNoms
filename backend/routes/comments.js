// routes for rating creation and retrieval

const express = require('express');
const router = express.Router();
const Restaurant = require('../databases/restaurantDatabase');
const Comment = require('../databases/commentDatabase');

const decodeToken = require('../token_middleware.js')

//gets a list of comments for the given restaurant id
router.get('/all_comments',async (req, res) => {
    const {restaurant_id} = req.query;

    
    //finds restaurant
  
    const restaurant = await Restaurant.findOne({ _id: restaurant_id}).catch((error) => {
	return res.status(500).json({
            msg: "Error trying to find restaurant. Please ensure a valid restaurant ID is given."
        });
    });
    if(!restaurant){
	return res.status(401).json({msg: "restaurant not found"});
    }

    const comment_list = restaurant.comments;
    
    return res.status(200).json({comments: comment_list});
});

//uploads a new comment for the specified restaurant
router.post('/new_comment',decodeToken, async (req, res) => {
    const {username, message, restaurant_id} = req.body;

    //checks that a username and comment message are given
    if(!username || !message || !restaurant_id){
	console.log("Error thahhahha");
	return res.status(400).json({msg: "Missing parameters: requires a 'username', 'message', and 'restaurant_id'"})
    }

    //finds restaurant
    const restaurant = await Restaurant.findOne({ _id: restaurant_id});
    if(!restaurant){
	return res.status(401).json({msg: "restaurant not found"});
    }
	    
    //gets the current date and formats it
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const date_string = "${month} ${day}, ${year}"; 

    const new_comment = new Comment({
	"username": username,
	"message": message,
	date: date_string
    });

    try{
	restaurant.comments.push(new_comment);

	await restaurant.save();
    } catch(error) {
	return res.status(500).json({msg: "failed to upload comment: likely because restaurant was notgiven comments attribute. This should only appear if restaurant was not created through website signup"});
    }

    res.status(200).json({comment: new_comment });

});

module.exports = router;
