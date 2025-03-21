import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import './search.css';
import axios from 'axios';

export function Search() {
      return (
        <SearchRestaurants/>
      );
}

async function getAverageRating(id) {
    try {
        // grab user's rating from the backend
        const ratingResponse = await axios.get('http://localhost:3001/rating/average_rating', { params: { restaurant_id: id } });
        const { rating } = await ratingResponse.data;
        return rating;
    } catch (err) {
        console.error(err.message);
        // console.error("restaurant_id:", id)
        return 0;
    }
};

async function getUserRating(id) {
    try {
        // grab user's rating from the backend
        const ratingResponse = await axios.get('http://localhost:3001/rating/user_rating', { params: { username: sessionStorage.getItem("username"), restaurant_id: id } });
	
        const { rating } = await ratingResponse.data;
        return rating;
    } catch (error) {
        console.error(error.message);
        return 0;
    }
};

export function SearchRestaurants() {
    // stores the restaurants get from backend
    const [restaurants, setRestaurants] = useState([]); 
    // stores errors
    const [error, setError] = useState(null); 

    function sendData(e) {
        setError(null);
        const query = e.target.value;

        if (query === '') { // empty query
            setRestaurants([]); // show no restaurants
            return;
        }
        else {
            fetch('http://localhost:3001/user/search', { // post search string (query)
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ payload: query }), // sending the search query
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response error');
                    }
                    return res.json(); // parse response as json
                })
                .then((data) => {
                    const payload = data.payload;
                    console.log(payload);
                    // fetch each restaurant's ratings
                    // promising that the data will be provided and promises that the ratings are numbers
                    const restaurantsWithRatings = payload.map((restaurant) => {
                        // fetch the average and user ratings in parallel for each restaurant
                        const averageRatingPromise = getAverageRating(restaurant._id);
                        const userRatingPromise = getUserRating(restaurant._id);
                        
                        return Promise.all([averageRatingPromise, userRatingPromise]).then(([averageRating, userRating]) => {
                            return {
                                // original restaurant data
                                ...restaurant, 
                                // add the average rating
                                averageRating: Number(averageRating), 
                                // add the user rating
                                userRating: Number(userRating)
                            };
                        });
                    });

                    // once all ratings are fetched, asynchronous
                    Promise.all(restaurantsWithRatings)
                        .then((updatedRestaurants) => {
                            // store the restaurants with their respective ratings
                            setRestaurants(updatedRestaurants); 
                        })
                        .catch((ratingError) => {
                            console.error('Error while fetching ratings:', ratingError);
                            setError('Error while fetching ratings');
                        });
                })
                .catch(error => {
                    setError(error.message);
                    console.error('Error fetching search results:', error);
                });
        }
    }
  
    return (
        <div className="search-div">
            <div className="search-feature">
                <div className="padding"></div>
                <div className="h1-search">Search</div>
                <div className="padding"></div>
                <form className="search-bar">
                    <input type="text" onKeyUp={sendData} placeholder="Search for Restaurants" className="inner-search-bar" />
                    <button type="submit" className="search-button">🔎</button>
                </form>   
                </div>
            <div className="padding"></div>

            { /* using map function, which iterates over the array to create restaurant cards */ }
            <div className="restaurant-cards">
                <div className="centered-search-div">
                    {error && <p>{error}</p>}
                </div>
                <div className="cards-search">
                    {restaurants.length > 0 ? (
                        restaurants.map((restaurant) => {
                            const isUserLoggedIn = Boolean(sessionStorage.getItem("username"));
                            return (
                                <RestaurantCard className="restaurant-card-search"
                                    // key={restaurant._id}
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
                        })
                    ) : (
                        <div className="centered-search-div">
                            <p>No restaurants found.</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="padding2"></div>
        </div>
    );
}

export default Search;

