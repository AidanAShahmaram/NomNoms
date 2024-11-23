import React, { useState } from 'react';
import './explore.css';

export function Explore() {
      return (
        <div>
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
            name: "Russian",
            image: "/russian.png"
        },
        {
            name: "Russian",
            image: "/russian.png"
        }
    ];

    return (
         <div className="cuisine-card">
            {cuisines.map((cuisine, index) => (
                <div key={index} className="cuisine-card">
                    <img src={cuisine.image} alt={cuisine.name} className="cuisine-image" />
                    <div className="overlay-text">
                        <h2>{cuisine.name}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Explore;

// make an array of cuisines, and add cards to each 

      