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

        if (!ratingResponse.ok) {
            throw new Error('Error While Fetching New Restaurant Rating');
        }
        const { rating } = await ratingResponse.json();
        return rating;
    } catch (err) {
        console.error(err.message);
        console.error("restaurant_id:", id)
        return 0;
    }
};

async function getUserRating(id) {
    try {
        // grab user's rating from the backend
        const ratingResponse = await axios.get('http://localhost:3001/rating/user_rating', { params: { restaurant_id: id } });
        if (!ratingResponse.ok) {
            throw new Error('Error While Fetching New Restaurant Rating');
        }
        const { rating } = await ratingResponse.json();
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
                .then(data => {
                    const payload = data.payload;
                    console.log(payload);
                    setRestaurants(payload); // stores the restaurants from backend
                })
                .catch(error => {
                    setError(error.message);
                    console.error('Error fetching search results:', error);
                });
        }
    }
  
    return (
        <div className="filter-div">
            <div className="padding"></div>
            <div className="h1-filter">Search</div>
            <div className="padding"></div>
            <form className="search-bar">
                <input type="text" onKeyUp={sendData} placeholder="Search for Restaurants" className="inner-search-bar" />
                <button type="submit" className="search-button">🔎</button>
            </form>   
           
            <div className="padding"></div>

            { /* using map function, which iterates over the array to create restaurant cards */ }
            <div className="restaurant-cards">
                {error && <p className="error">{error}</p>}
                <div className="cards-filter">
                    {restaurants.length > 0 ? (
                        restaurants.map((restaurant) => {
                            const isUserLoggedIn = Boolean(sessionStorage.getItem("username"));
                            return (
                                <RestaurantCard
                                    key={restaurant.id}
                                    title={restaurant.name}
                                    pic={restaurant.image_link}
                                    weblink={restaurant.website}
                                    address={restaurant.address}
                                    phone={restaurant.phone}
                                    ratingInit={getAverageRating(restaurant.id)}
                                    tags={restaurant.tags}
                                    id={restaurant.id}
                                    user={isUserLoggedIn}
                                />
                            );
                        })
                    ) : (
                        <p>No restaurants found.</p>
                    )}
                </div>
            </div>
            <div className="padding2"></div>
        </div>
    );
}

export default Search;

