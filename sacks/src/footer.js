import React from 'react';
import './footer.css'
import logo from '../src/assets/logo.png'

import instagram from '../src/assets/instagram-logo.png'
import youtube from '../src/assets/youtube-logo.png'
import mail from '../src/assets/mail-icon.png'

function Footer() {
    return (
        <div className="footer">
            <div className="footer-left">
                <img src={logo} class="footer-logo" alt="logo"/>
            </div>
            <div className="footer-padding"></div>
            <div className="footer-middle">
                <p>Home</p>
                <p>Explore</p>
                <p>Search</p>
            </div>
            <div className="footer-right">
                <p>Stay Connected</p>
                <div className="logos">
                    <img src={youtube} alt="instagram"/>
                    <img src={instagram} alt="instagram"/>
                    <img src={mail} alt="instagram"/>
                </div>
            </div>
        </div>
    );
}

export default Footer;