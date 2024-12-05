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
            // console.log('Owner Token:', ownerToken);  // Debugging: Check if token is retrieved

            // if (!ownerToken) {
            //     setError('Owner token is missing');
            //     return;
            // }


            // const token = localStorage.getItem('businessToken');
            // console.log('Business Token:');
            // console.log(token);
            const business_username = localStorage.getItem('username');
            console.log("got business username");
            console.log(business_username);

            // Make the GET request with the token in the Authorization header

            // const response = await axios.get('http://localhost:3001/data/view_restaurants', token);
            // console.log("There is a response");

            const response = await axios.get('http://localhost:3001/data/view_restaurants', {
                params: { username: business_username }  // Send the username as a query parameter
            });

           

            // const response = await axios.get('http://localhost:3001/data/view_restaurants', business_username);

            console.log("Response data");
            console.log(response.data);
            // If successful, set the restaurants

            if (response.data === 200) {
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
                <div className="cards-filter">
                        {/* <RestaurantCard className="restaurant-card-filter"
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
                        /> */}

{restaurant.length > 0 ? (
          restaurant.map((restaurant) => (
            <RestaurantCard 
              key={restaurant._id}  // Use ObjectId as key
              className="restaurant-card-filter"
              title={restaurant.name}
              pic={restaurant.image_link}
              weblink={restaurant.website}
              address={restaurant.address}
              phone={restaurant.phone}
              ratingInit={(restaurant.rating_count / restaurant.rating_total) * 5}  // Calculating rating
              tags={restaurant.tags}
              id={restaurant._id}
              user={restaurant.user}  // Assuming the restaurant object has a 'user' field
            />
          ))
        ) : (
          <p>No restaurants available.</p>  // Display message if no restaurants
        )}
                </div>  
            </div>
        </div>
    );
}

export default Business;

