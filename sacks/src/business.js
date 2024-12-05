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
    const [restaurants, setRestaurants] = useState([]); // stores restaurants that are filtered
    const [error, setError] = useState(null); // error handling

    useEffect(() => {
        fetchRestaurants();  // Fetch restaurants when component mounts
    }, []);

    const fetchRestaurants = async () => {
        try {
            const ownerToken = localStorage.getItem('owner_token');  // Retrieve the token from localStorage
            console.log('Owner Token:', ownerToken);  // Debugging: Check if token is retrieved

            if (!ownerToken) {
                setError('Owner token is missing');
                return;
            }

            // Make the GET request with the token in the Authorization header
            const response = await axios.get('http://localhost:3001/owners/view_restaurants', {
                headers: {
                    Authorization: `Bearer ${ownerToken}`,
                },
            });

            // If successful, set the restaurants
            setRestaurants(response.data);
        } catch (error) {
            setError('Error fetching restaurant data');
            console.error('Error fetching restaurant data:', error);
        }
    };
    // const fetchRestaurants = async () => {
    //     try {
    //         const ownerToken = localStorage.getItem('owner_token'); // Assuming you store the token in localStorage
            
    //         if (!ownerToken) {
    //             setError('Owner token is missing');
    //             return;
    //         }

    //         // Make the GET request to your backend with the authorization token in the headers
    //         const response = await axios.get('http://localhost:3001/owner/view_restaurants', {
    //             headers: {
    //                 Authorization: `Bearer ${ownerToken}`, // Passing the token in the Authorization header
    //             },
    //         });

    //         // Set the restaurant data into state
    //         setRestaurants(response.data); 

    //     } catch (error) {
    //         setError('Error fetching restaurant data');
    //         console.error('Error fetching restaurant data:', error);
    //     }
    // };

    // const fetchRestaurants = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3001/owner/view_restaurants', {
    //             headers: {
    //                 Authorization: `Bearer ${ownerToken}` // Include the owner token if you're using JWT
    //             }
    //         });
    //         setRestaurants(response.data.payload); // Update your restaurant list
    //     } catch (error) {
    //         console.error("Error fetching restaurant data:", error);
    //         setError("Error fetching restaurant data");
    //     }
    // };

    
    
    // useEffect(() => {
    //     const fetchRestaurants = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3001/owner/view_restaurants');  // endpoint to get restaurants for the logged-in user
    //             const payload = response.data.payload;
    //             console.log(payload);
    //             setRestaurants(payload); // Store the restaurant data from the backend
    //         } catch (error) {
    //             setError('Failed to fetch restaurants: ' + error.message);
    //             console.error('Error fetching restaurant data:', error);
    //         }
    //     };

    //     fetchRestaurants();  // Call the function to fetch data on mount
    // }, []); // Empty dependency array means this effect runs only once when the component mounts
    



    // using map function, which iterates over the array to create a button for each tag
    return (
        <div className="filter-div">
            <div className="padding"></div>
            <div className="h1-filter">My Restaurant</div>
            <div className="padding"></div>
            <div className="restaurant-cards">
                {error && <p className="error">{error}</p>}
                <div className="cards-filter">
                    {restaurants.map((restaurant) => (
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
                    ))}
                </div>  
            </div>
        </div>
    );
}

export default Business;

