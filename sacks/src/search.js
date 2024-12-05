import React, { useState } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import './search.css'

export function Search() {
      return (
        <div className="filter-tags">
            <SearchRestaurants/>
        </div>
      );
}

export function SearchRestaurants() {
    const [restaurants, setRestaurants] = useState([]); 
    const [error, setError] = useState(null); 

    function sendData(e) {
        const query = e.target.value;
        // only if the query is not empty
        if (query) {
            fetch('http://localhost:3001/user/search', {
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
                        restaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.id}
                                title={restaurant.name}
                                pic={restaurant.image_link}
                                weblink={restaurant.website}
                                address={restaurant.address}
                                phone={restaurant.phone}
                                ratingInit={(restaurant.rating_count / restaurant.rating_total) * 5}
                                tags={restaurant.tags}
                                id={restaurant.id}
                                user={restaurant.user}
                            />
                        ))
                    ) : (
                        <p>No restaurants found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;

