import React, { useState } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import './filter.css'

export function Filter() {
      return (
        <div className="filter-tags">
            <SelectTag />
        </div>
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

export function SelectTag() {
    // array of cuisine tag names
    const cuisineTags = [
        'American', 'Brazilian', 'Bulgarian', 'Chinese', 'Cuban',
        'Ethiopian', 'French', 'German', 'Guatemalan', 'Indian',
        'Indonesian', 'Iranian', 'Italian', 'Japanese', 'Jamaican',
        'Korean', 'Mexican', 'Moroccan', 'Nigerian', 'Peruvian',
        'Russian', 'Taiwanese', 'Thai', 'Venezuelan', 'Vietnamese'
    ];

    // array of general tag names
    const generalTags = [
        'Bar', 'Breakfast', 'Brunch', 'Buffet', 'Casual dining', 
        'Coffee Shop', 'Cozy', 'Family-friendly', 'Fast food', 'Fine dining',
        'Gluten-free', 'Gourmet', 'Halal', 'Healthy', 'Kosher',
        'Organic', 'Pet-friendly', 'Pescetarian', 'Pub', 'Romantic',
        'Street food', 'Take out', 'Vegan', 'Vegetarian'
    ];

    // Use state to keep track of which tags are selected/not selected
    const [selectedTags, setSelectedTags] = useState({});
    const [restaurants, setRestaurants] = useState([]); // stores restaurants that are filtered
    const [error, setError] = useState(null); // error handling

    /* 
    Toggle the selection of tags
    Takes in a parameter tag, which is the tag that the user clicks on
    setSelectedTags will update the state of selectedTags
    setSelectedTags ia  callback function, which receives the previous state of selectedTags
    ... is the spread operator, creates shallow copy of selectedTags state, keeps existing selection tags intact while changing specific tag
    [tag]: !prevSelectedTags[tag] creates a new key-value pair in the selectedTags object
    prevSelectedTags[tag] is either true or false, and the value is negated
    */ 
    const handleClick = (tag) => {
        setSelectedTags((prevSelectedTags) => ({
            ...prevSelectedTags,
            [tag]: !prevSelectedTags[tag]
        }));
    };

    // setSelectedTags({}) resets the entire state to an empty object, removes all the key-value pairs (tags) from selectedTags
    const resetTags = () => {
        setSelectedTags({});
        setRestaurants([]);
    };

    // async - allows use of await, handle operations like API call
    const submitTags = async () => {
        // extracts the keys (tags) from selectedTags object and puts into a list of tags
        // Object.keys(selectedTags) - gets the keys from selectedTags
        // .filter((tag) => selectedTags[tags]) - filters to only include those that have been selected
        const selectedTagList = Object.keys(selectedTags).filter((tag) => selectedTags[tag]);
        
        if (selectedTagList.length === 0) { // if there are no selected tags
            alert("Please select at least one tag!");
            return;
        }
        
        try { // make API request
            setRestaurants([]);

            const response = await axios.get('http://localhost:3001/user/restaurants_filter', { // sends HTTP GET request 
                params: {tags: selectedTagList.join(',')}, // specifies query parameters, combines array into string of tags separated by commas
            });

            console.log(response);
            if (response.data.length === 0) {
                alert('No matching restaurants found.');
            }
            else {
                // setRestaurants(response.data); // updates the state of restaurants with data from API response
                const payload = response.data;
                console.log(payload);
                const restaurantsWithRatings = payload.map((restaurant) => {
                    const averageRatingPromise = getAverageRating(restaurant._id);
                    const userRatingPromise = getUserRating(restaurant._id);
                        
                    return Promise.all([averageRatingPromise, userRatingPromise]).then(([averageRating, userRating]) => {
                        return {
                            // original restaurant data
                            ...restaurant, 
                            // add the average rating
                            averageRating, 
                            // add the user rating
                            userRating
                        };
                    });
                });
                // once all ratings are fetched, asynchronous
                Promise.all(restaurantsWithRatings)
                    .then((updatedRestaurants) => {
                        // Store the restaurants with their respective ratings
                        setRestaurants(updatedRestaurants); 
                    })
                    .catch((ratingError) => {
                        console.error('Error while fetching ratings:', ratingError);
                        setError('Error while fetching ratings');
                    });
                // setError(null); // success, clears any previous error
            }
        }
        catch(err) { // if request fails
            console.error(err);
            //console.error('Error fetching filtered restaurants');
            setError('Failed to load restaurants. Please try again'); // updates state with error
        }
    };



    // using map function, which iterates over the array to create a button for each tag
    return (
        <div className="filter-div">
            <div className="padding"></div>
            <div className="h1-filter">Filter</div>
            <div className="padding"></div>
            <div className="h2-filter">Cuisine</div>
            <div className="tags-div">
                {cuisineTags.map((tag) => (
                    <button key={tag} onClick={() => handleClick(tag)} className={`tag ${selectedTags[tag] ? 'on' : 'off'}`}> 
                    {tag}
                    </button>
                ))}
            </div>
            <div className="padding"></div>
            <div className="h2-filter">General</div>
            <div className="tags-div">
                {generalTags.map((tag) => (
                    <button key={tag} onClick={() => handleClick(tag)} className={`tag ${selectedTags[tag] ? 'on' : 'off'}`}> 
                    {tag}
                    </button>
                ))}
            </div>
            <div className="padding"></div>
            <div className="manage-tags">
                <div>
                    <button className="reset-button" onClick={resetTags}>Reset All</button>
                    <button className="submit-button" onClick={submitTags}>Submit</button>
                </div>
            </div>


            <div className="restaurant-cards">
                {error && <p className="error">{error}</p>}
                <div className="cards-filter">
                    {restaurants.map((restaurant) => {
                        const isUserLoggedIn = Boolean(sessionStorage.getItem("username"));
                        return (
                            <RestaurantCard className="restaurant-card-filter"
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
                    )})}
                </div>  
            </div>
        </div>
    );
}

export default Filter;

