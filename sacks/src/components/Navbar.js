import './Navbar.css';
import logo from '../assets/logo-icononly.png';
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

/* Default NavBar at the top of the page
Includes home, explore, filter, search, and login/signup buttons */
export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <img className="navbar-logo" src={logo} alt="logo" height="30px;"></img>
            </div>  
            
            <NavLink to="/" end activeClassName="active-link" className="nav-link">Home</NavLink>
            <NavLink to="explore" end activeClassName="active-link" className="nav-link">Explore</NavLink>
            <NavLink to="filter" end activeClassName="active-link" className="nav-link">Filter</NavLink>
            <NavLink to="search" end activeClassName="active-link" className="nav-link">Search</NavLink>
            
            <div className="login-signup">
                <NavLink to="/chooselogin">
                    <button className="login">Log in</button>
                </NavLink> 
                <NavLink to="/choosesignup">
                    <button className="signup">Sign Up</button>
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar