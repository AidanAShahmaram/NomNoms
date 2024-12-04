
import './Navbar.css';
import logo from '../assets/logo-icononly.png';
import { NavLink } from 'react-router-dom';

export const LoggedInNavbar = () => {

    const token = sessionStorage.getItem('token');
    console.log("Logged In Navbar: " + token);
    
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

export default LoggedInNavbar