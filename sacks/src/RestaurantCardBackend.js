const express = require('express');
const router = express.Router();
// enter the restaurants module in the models directory
const Restaurant = require('../models/Restaurant');

router.post('/restaurants/${id}/userrating', async (req, res) => {
    const { userId, newRating } = req.body;
    // restaurant id
    const rid = req.params.id;

    try {
        // Find the Restaurant
        const restaurant = await Restaurant.findById(rid);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant Not Found in Database' });
        }

        // Find the user's rating by iterating through them with r
        const userRatingIndex = restaurant.ratings.findIndex(r => r.userId === userId);
        if (userRatingIndex !== -1) {
            // Update the rating
            restaurant.userRatings[userRatingIndex].rating = newRating;
        } else {
            // If your rating does not exist yet, add it
            restaurant.userRatings.push({ userId, newRating });
        }

        await restaurant.save();
        res.status(200).json({ message: 'Rating Successfully Updated!' });
    } catch (error) {
        res.status(500).json({ message: "Error While Trying to Update User's Rating", error: error.message });
    }
});

router.get('/restaurants/${id}/rating', async (req, res) => {
    const rid = req.params.id;

    try {
        const restaurant = await Restaurant.findById(rid);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant Not Found in Database' });
        }

        // Calculate the average of all the ratings
        let sum = 0;
        let total = 0;
        for(let i = 0; i < restaurant.userRatings.length; i++){
            const rating = restaurant.userRatings[i].rating;
            // if the user rating exists
            if(rating !== undefined) {
                sum += rating;
                total ++
            }
        }
        // don't divide by 0
        const average = count > 0 ? (sum/total) : 0;

        res.status(200).json({ average });
    } catch (error) {
        res.status(500).json({ message: 'Error Fetching the Average Rating', error: error.message });
    }
});

module.exports = router;
