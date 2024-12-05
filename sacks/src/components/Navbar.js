
import './Navbar.css';
import logo from '../assets/logo-icononly.png';
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";

export const Navbar = () => {

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

    return (
        <div className="navbar">
            <div className="logo">
                <img className="navbar-logo" src={logo} alt="logo" height="30px;"></img>
            </div>  
            
            <NavLink to="/" end activeClassName="active-link" className="nav-link">Home</NavLink>
            <NavLink to="explore" end activeClassName="active-link" className="nav-link">Explore</NavLink>
            <NavLink to="filter" end activeClassName="active-link" className="nav-link">Filter</NavLink>
            <NavLink to="search" end activeClassName="active-link" className="nav-link">Search</NavLink>
           
           {/* <form onSubmit={onSubmit} className="search-bar">
                <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search for Restaurants" className="inner-search-bar" />
                <button type="submit" className="search-button">🔎</button>
           </form> */}
            
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