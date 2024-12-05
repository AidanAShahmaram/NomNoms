
import './Navbar.css';
import logo from '../assets/logo-icononly.png';
import { NavLink } from 'react-router-dom';
import userProfile from "../assets/user.png";

export const LoggedInNavbar = () => {

    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    console.log("Logged In Navbar: " + token);

    return (
        <div className="navbar">
            <div className="logo">
                <img className="navbar-logo" src={logo} alt="logo" height="30px;"></img>
            </div>  
            
            <NavLink to="/" end activeClassName="active-link" className="nav-link">Home</NavLink>
            <NavLink to="explore" end activeClassName="active-link" className="nav-link">Explore</NavLink>
            <NavLink to="filter" end activeClassName="active-link" className="nav-link">Filter</NavLink>
            <NavLink to="search" end activeClassName="active-link" className="nav-link">Search</NavLink>
           

            {/* <a href="#AboutUs">About Us</a> */}
            {/* <input type="searchbar" placeholder="Search for restaurants" id="searchbar"></input> */}
            
            <div className="user-profile">
                <img class="user-image" src={userProfile} alt="user-profile" ></img> 
                <p>{username}</p>
                
            </div>

        </div>
    )
}

export default LoggedInNavbar