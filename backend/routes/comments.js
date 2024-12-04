// routes for rating creation and retrieval

const express = require('express');
const router = express.Router();
const Restaurant = require('../databases/restaurantDatabase');
const Comment = require('../databases/commentDatabase');

const decodeToken = require('../token_middleware.js')

//gets a list of comments for the given restaurant id
router.get('/all_comments',async (req, res) => {
    restaurant_id = req.params.id;
    
    //finds restaurant
    const restaurant = await Restaurant.findOne({ _id: restaurant_id});
    if(!restaurant){
	return res.status(401).json({msg: "restaurant not found"});
    }

    const comment_list = restaurant.comments;
    
    return res.status(200).json({rating: result});
});

//uploads a new comment for the specified restaurant
router.post('/new_comment',decodeToken, async (req, res) => {
    const {username, message} = req.body;
    restaurant_id = req.params.id;

    //checks that a username and comment message are given
    if(!username || !message){
	return res.status(400).json({msg: "Missing parameters: requires a \"username\" and \"message\""})
    }

    //finds restaurant
    const restaurant = await Restaurant.findOne({ _id: restaurant_id});
    if(!restaurant){
	return res.status(404).json({msg: "restaurant not found"});
    }

    //gets the current date and formats it
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const date_string = "$(month) $(day), $(year)"; 

    const new_comment = new Comment({
	"username": username,
	"message": message,
	date: date_string
    });

    restaurant.comments.push(comment);

    await restaurant.save();

    res.status(200).json({ msg: "Rating Sucessfully Updated!" });

});

module.exports = router;
