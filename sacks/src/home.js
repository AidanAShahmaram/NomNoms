import React from 'react';
import './home.css'
import backgroundImage from './assets/plates-background.png';
import logo from './assets/nomnoms-logo.png';
import introBackground from './assets/intro-rectangle-background.png';
import pathBackground from './assets/how-it-works.png';

export function HeaderDiv() {
    const divStyle = {
        backgroundImage: `url(${backgroundImage})`, 
      };
    
      return (
        <div className="header-div" style={divStyle}>
            <div className="p-home">Welcome to</div>
            <img id="logo-title" src={logo} alt="NomNoms logo" />
            <div className="p-home">Discover new restaurants near you</div>
            <button className="get-started">Get Started</button>
        </div>
      );
}

export function IntroBox() {
    const divStyle = {
        backgroundImage: `url(${introBackground})`, 
    };
    
      return (
        <div className="centered-div">
            <div className="intro-div" style={divStyle}>
            <div className="body-text">
                <div className="h2-home">What is NomNoms?</div>
                <div className="h3-home">We want to create a community where restaurant owners and users can come together and discover new food!</div>
            </div>
            <div className="rectangle"></div>
            </div>
        </div>
      );
}

export function PathDiv() {
    const divStyle = {
        backgroundImage: `url(${pathBackground})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        height: '120vh',
        width: '100vw', 
    };
    
      return (
        <div className="centered-div1">
            <div className="h1-home">How it works</div>
            <div className="path-div" style={divStyle}></div> 
            <div className="path-padding"></div>
        </div>
      );
}

