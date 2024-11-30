import React from 'react';
import './home.css'
import backgroundImage from './assets/plates-background.png';
import logo from './assets/nomnoms-logo.png';
import introBackground from './assets/intro-rectangle-background.png';
import pathBackground from './assets/how-it-works.png';

export function HeaderDiv() {
    const divStyle = {
        backgroundImage: `url(${backgroundImage})`, // Set the background image dynamically
      };
    
      return (
        <div className="header-div" style={divStyle}>
            <p>Welcome to</p>
            {/* <h1>NomNoms</h1> */}
            <img id="logo-title" src={logo} alt="NomNoms logo" />
            <p>Discover new restaurants near you</p>
            <button className="get-started">Get Started</button>
        </div>
      );
}

export function IntroBox() {
    const divStyle = {
        backgroundImage: `url(${introBackground})`, // Set the background image dynamically
    };
    
      return (
        <div className="centered-div">
            <div className="intro-div" style={divStyle}>
            <div className="body-text">
                <h2>What is NomNoms?</h2>
                <h3>We want to create a community where restaurant owners and users can come together and discover new food!</h3>
            </div>
            <div className="rectangle"></div>
            </div>
        </div>
      );
}

export function PathDiv() {
    const divStyle = {
        backgroundImage: `url(${pathBackground})`, // Set the background image dynamically
    };
    
      return (
        <div className="centered-div1">
            <h1>How it works</h1>
            <div className="path-div" style={divStyle}>
            </div> 
        </div>
      );
}

