import React, { useState } from 'react';
import './filter.css'

export function Filter() {
      return (
        <div className="filter-tags">
            <SelectTag />
        </div>
      );
}

export function SelectTag() {
    // array of cuisine tag names
    const cuisineTags = [
        'American', 'Brazilian', 'Bulgarian', 'Chinese', 
        'French', 'German', 'Indian', 'Indonesian', 
        'Iranian', 'Italian', 'Japanese', 'Mexican', 
        'Russian', 'Taiwanese', 'Thai', 'Vietnamese'
    ];

    // array of general tag names
    const generalTags = [
        'Breakfast', 'Brunch', 'Buffet', 'Casual dining', 
        'Cozy', 'Family-friendly', 'Fast food', 'Fine dining',
        'Gluten-free', 'Halal', 'Organic', 'Pet-friendly',
        'Street food', 'Take out', 'Vegan', 'Vegetarian'
    ];

    // Use state to keep track of which tags are selected/not selected
    const [selectedTags, setSelectedTags] = useState({});

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
    }

    // using map function, which iterates over the array to create a button for each tag
    return (
        <div className="filter-div">
            <div className="padding"></div>
            <h1>Search</h1>
            <div className="padding"></div>
            <h2>Cuisine</h2>
            <div className="tags-div">
                {cuisineTags.map((tag) => (
                    <button key={tag} onClick={() => handleClick(tag)} className={`tag ${selectedTags[tag] ? 'on' : 'off'}`}> 
                    {tag}
                    </button>
                ))}
            </div>
            <div className="padding"></div>
            <h2>General</h2>
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
                    <button className="submit-button">Submit</button>
                </div>
                {/* This should send get request for the correct restaurant cards*/}
               
            </div>
            

            
        </div>
    );
}

export default Filter;

