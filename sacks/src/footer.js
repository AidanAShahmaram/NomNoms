import React from 'react';
import './footer.css'
import logo from '../src/assets/logo.png'

import instagram from '../src/assets/instagram-logo.png'
import youtube from '../src/assets/youtube-logo.png'
import mail from '../src/assets/mail-icon.png'

import { NavLink } from 'react-router-dom';

function Footer() {
    return (
        <div className="footer">
            <div className="footer-left">
                <img src={logo} class="footer-logo" alt="logo"/>
            </div>
            <div className="footer-padding"></div>
            <div className="footer-middle">
                <NavLink to="/" end activeClassName="active-link" className="nav-link"> <p>Home</p> </NavLink>
                <NavLink to="explore" end activeClassName="active-link" className="nav-link"> <p>Explore</p> </NavLink>
                <NavLink to="filter" end activeClassName="active-link" className="nav-link"> <p>Filter</p> </NavLink>
                <NavLink to="search" end activeClassName="active-link" className="nav-link"> <p>Search</p> </NavLink>    
               
            </div>
            <div className="footer-right">
                <p>Stay Connected</p>
                <div className="logos">
                    <a href="https://www.youtube.com/@UCLAengineering/featured" target="_blank">
                        <img src={youtube} alt="youtube"/>
                    </a>
                    <a href="https://www.instagram.com/ucla_engineering/" target="_blank">
                        <img src={instagram} alt="instagram"/>
                    </a>
                    <a href="mailto:mingao@cs.ucla.edu?subject=CS 35L Project&body=Hello, this is an automated email showing that the CS 35L Project has been accessed." target="_blank">
                        <img src={mail} alt="mail"/>
                    </a>
                    
                    
                </div>
            </div>
        </div>
    );
}

export default Footer;