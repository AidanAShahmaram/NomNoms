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


    function sendData(e) {
        fetch('http://localhost:3001/routes/users/search', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({payload: e.value})
        }).then(res => res.json()).then(data => {
            let payload = data.payload;
            console.log(payload);
        });
    }

    // const [searchQuery, setSearchQuery] = useState('');
    // const handleSearch = (valEvent) => {
    //     setSearchQuery(valEvent.target.value);
    // }

    // const onSubmit = async (event) => {
    //     {/* don't want the page reloading, so prevent default */}
    //     event.preventDefault();
    //     try {
    //         const resp = await axios.get('ROUTE', { params: { query: searchQuery } });
    //         console.log(resp.data);
    //     } catch (err) {
    //         console.error('Error fetching search results:', err);
    //     }
    // };


    // using map function, which iterates over the array to create a button for each tag
    return (
        <div className="filter-div">
            <div className="padding"></div>
            <div className="h1-filter">Search</div>
            <div className="padding"></div>
            <form className="search-bar">
                <input type="text" onKeyUp={sendData} /* value={searchQuery} onChange={handleSearch} */ placeholder="Search for Restaurants" className="inner-search-bar" />
                <button type="submit" className="search-button">🔎</button>
            </form>

           
           
            <div className="padding"></div>
            

            {/* <div className="restaurant-cards">
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
            </div> */}
        </div>
    );
}

export default Search;

