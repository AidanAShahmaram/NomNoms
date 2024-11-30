import React, { useState } from 'react';
import './explore.css';
import RestaurantCard from './RestaurantCard';

export function Explore() {
      return (
        <div className="explore-page">
            <h1>Explore</h1>
            <CuisineCard />
            <div className="cards">
          <RestaurantCard className="restaurant-card"
          title="Brewster's Cafe"
          pic="https://sprudge.com/wp-content/uploads/2021/11/animal-crossing-the-roost-brianna-fox-priest.jpg"
          weblink="https://animalcrossing.fandom.com/wiki/The_Roost"
          address="Animal Crossing"
          phone="(123) 456-7890"
          ratingInit={3.7}
          tags={["Cozy", "Family-Friendly", "Coffee"]}
          id="Brewster's Cafe"
          user="Johnny"
          />
          <RestaurantCard className="restaurant-card"
          title="Brewster's Cafe"
          pic="https://sprudge.com/wp-content/uploads/2021/11/animal-crossing-the-roost-brianna-fox-priest.jpg"
          weblink="https://animalcrossing.fandom.com/wiki/The_Roost"
          address="Animal Crossing"
          phone="(123) 456-7890"
          ratingInit={3.7}
          tags={["Cozy", "Family-Friendly", "Coffee"]}
          id="Brewster's Cafe"
          user="Johnny"
          />
          <RestaurantCard className="restaurant-card"
          title="Brewster's Cafe"
          pic="https://sprudge.com/wp-content/uploads/2021/11/animal-crossing-the-roost-brianna-fox-priest.jpg"
          weblink="https://animalcrossing.fandom.com/wiki/The_Roost"
          address="Animal Crossing"
          phone="(123) 456-7890"
          ratingInit={3.7}
          tags={["Cozy", "Family-Friendly", "Coffee"]}
          id="Brewster's Cafe"
          user="Johnny"
          />
        </div>
        </div>
      );
}

export function CuisineCard() {
    const cuisines = [
        {
            name: "Bulgarian",
            image: "/bulgarian.png"
        },
        {
            name: "Russian",
            image: "/russian.png"
        },
        {
            name: "Iranian",
            image: "/iranian.png"
        },
        {
            name: "Indian",
            image: "/indian.png"
        },
        {
            name: "Thai",
            image: "/thai.png"
        },
        {
            name: "Chinese",
            image: "/chinese.png"
        },
        {
            name: "Japanese",
            image: "/japanese.png"
        },
        {
            name: "Mexican",
            image: "/mexican.png"
        },
        {
            name: "French",
            image: "/french.png"
        }
    ];

    return (
         <div className="cuisine-card">
            
            {cuisines.map((cuisine, index) => (
                <div class="image-container">
                    <img src={cuisine.image} alt={cuisine.name}/>
                    <div class="centered-text">{cuisine.name}</div>
                </div>
            ))}
        </div>
    );
}

export default Explore;

// make an array of cuisines, and add cards to each 

      