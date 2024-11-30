import React, { useState } from 'react';
import './explore.css';

export function Explore() {
      return (
        <div className="explore-page">
            <h1>Explore</h1>
            <CuisineCard />
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

    // make an array of cuisines, and add cards to each 
    // dynamically generating html/css for each cuisine with their respective images
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



      