
import './Navbar.css';
import logo from '../assets/logo-icononly.png';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {

    return (
        <div className="navbar">
            <div className="logo">
                <img className="navbar-logo" src={logo} alt="logo" height="30px;"></img>
            </div>  
            
            <NavLink to="/" end activeClassName="active-link" className="nav-link">Home</NavLink>
            <NavLink to="explore" end activeClassName="active-link" className="nav-link">Explore</NavLink>
            <NavLink to="search" end activeClassName="active-link" className="nav-link">Search</NavLink>
           

            {/* <a href="#AboutUs">About Us</a> */}
            {/* <input type="searchbar" placeholder="Search for restaurants" id="searchbar"></input> */}
            
            <div className="login-signup">
                <button className="login" onclick="window.location.href='./Login.js'">Log in</button>
                <button className="signup" onclick="window.location.href='./SignUp.js'">Sign Up</button>
            </div>

        </div>
    )
}

export default Navbar