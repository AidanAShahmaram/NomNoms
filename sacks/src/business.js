import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import './business.css'


export function Business() {
      return (
        <MyRestaurant />
      );
}

export function MyRestaurant() {
    const [restaurant, setRestaurant] = useState([]); // stores restaurants that are filtered
    const [error, setError] = useState(null); // error handling

    useEffect(() => {
        fetchRestaurants();  // Fetch restaurants when component mounts
    }, []);

    const fetchRestaurants = async () => {
        try {
            // const ownerToken = localStorage.getItem('owner_token');  // Retrieve the token from localStorage
            console.log('Owner Token:', ownerToken);  // Debugging: Check if token is retrieved

            if (!ownerToken) {
                setError('Owner token is missing');
                return;
            }

            // Make the GET request with the token in the Authorization header

            const response = await axios.get('http://localhost:3001/data/view_restaurants', {
                headers: {
                    Authorization: ownerToken  // Correct header format
                }
            });
            console.log("There is a response");
            // If successful, set the restaurants

            if (response.data !== 200) {
                console.log("No restaurant found.");
                setError('No restaurant found.')
            }
            setRestaurant(response.data);
            console.log(response.data);
        } catch (error) {
            setError('Error fetching restaurant data');
            console.error('Error fetching restaurant data:', error);
        }
    };

    // using map function, which iterates over the array to create a button for each tag
    return (
        <div className="filter-div">
            <div className="padding"></div>
            <div className="h1-filter">My Restaurant</div>
            <div className="padding"></div>
            <div className="restaurant-cards">
                {error && <p className="error">{error}</p>}

                <p>{restaurant.name}</p>
                {/* <div className="cards-filter">
                        <RestaurantCard className="restaurant-card-filter"
                            key={restaurant.id} 
                            title={restaurant.name}
                            pic={restaurant.image_link} 
                            weblink={restaurant.website} 
                            address={restaurant.address}
                            phone={restaurant.phone} 
                            ratingInit={(restaurant.rating_count / restaurant.rating_total ) * 5} 
                            tags={restaurant.tags}
                            id={restaurant.id} 
                            user={restaurant.user} 
                        />
                </div>   */}
            </div>
        </div>
    );
}

export default Business;

