import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import './explore.css';

export function Explore() {
    const [restaurants, setRestaurants] = useState([]); // stores restaurants
    const [error, setError] = useState(null); // error handling

    // function to get the average rating of a restaurant
    async function getAverageRating(id) {
        try {
            const ratingResponse = await axios.get('http://localhost:3001/rating/average_rating', { params: { restaurant_id: id } });
            const { rating } = ratingResponse.data;
            return rating;
        } catch (err) {
            console.error(err.message);
            return 0;
        }
    }

    // function to get the user's rating for a restaurant
    async function getUserRating(id) {
        try {
            const ratingResponse = await axios.get('http://localhost:3001/rating/user_rating', { params: { username: sessionStorage.getItem("username"), restaurant_id: id } });
            const { rating } = ratingResponse.data;
            return rating;
        } catch (error) {
            console.error(error.message);
            return 0;
        }
    }

    useEffect(() => {
        async function fetchTopRestaurants() {
            setError(null);

            try {
                const response = await axios.get('http://localhost:3001/user/top5'); // get request to backend
                // access the top5_restaurants array from the response
                const payload = response.data.top5_restaurants;
    
                if (Array.isArray(payload) && payload.length > 0) {
                    const restaurantsWithRatings = payload.map((restaurant) => {
                        const averageRatingPromise = getAverageRating(restaurant._id);
                        const userRatingPromise = getUserRating(restaurant._id);
    
                        return Promise.all([averageRatingPromise, userRatingPromise]).then(([averageRating, userRating]) => {
                            return {
                                ...restaurant, 
                                averageRating, 
                                userRating
                            };
                        });
                    });
    
                    // once all ratings are fetched, update state
                    Promise.all(restaurantsWithRatings)
                        .then((updatedRestaurants) => {
                            setRestaurants(updatedRestaurants);
                        })
                        .catch((ratingError) => {
                            console.error('Error while fetching ratings:', ratingError);
                            setError('Error while fetching ratings');
                        });
                } else {
                    setError('No matching restaurants found.');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load restaurants. Please try again');
            }
        }
    
        fetchTopRestaurants();
    }, []); 

    // displays the top restaurants on the explore page
    return (
        <div className="filter-div">
            <div className="explore-centered-div">
                <div className="padding"></div>
                <div className="padding"></div>
                <div className="h1-filter">Explore</div>
                <div className="padding"></div>
                <div className="h2-explore">Top Restaurants</div>
                <div className="padding"></div>
            </div>

            <div className="explore-centered-div">{error && <p className="error">{error}</p>}</div>
            <div className="restaurant-cards">
                <div className="cards-filter">
                    {restaurants.map((restaurant) => {
                        const isUserLoggedIn = Boolean(sessionStorage.getItem("username"));
                        return (
                            <RestaurantCard className="restaurant-card-filter"
                                key={restaurant._id}
                                title={restaurant.name}
                                pic={restaurant.image_link}
                                weblink={restaurant.website}
                                address={restaurant.address}
                                phone={restaurant.phone}
                                ratingInit={restaurant.averageRating}
                                userRatingInit={restaurant.userRating}
                                tags={restaurant.tags}
                                id={restaurant._id}
                                user={isUserLoggedIn}
                            />
                        );
                    })}
                </div>  
            </div>
        </div>
    );
}

export default Explore;
