import './Navbar.css';
import logo from '../assets/logo-icononly.png';
import { NavLink, useNavigate } from 'react-router-dom';
import userProfile from "../assets/user.png";

export const LoggedInNavbar = () => {

    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    console.log("Logged In Navbar: " + token);

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        navigate('/');
    }

    return (
        <div className="navbar">
            <div className="logo">
                <img className="navbar-logo" src={logo} alt="logo" height="30px;"></img>
            </div>  
            
            <NavLink to="/" end activeClassName="active-link" className="nav-link">Home</NavLink>
            <NavLink to="explore" end activeClassName="active-link" className="nav-link">Explore</NavLink>
            <NavLink to="filter" end activeClassName="active-link" className="nav-link">Filter</NavLink>
            <NavLink to="search" end activeClassName="active-link" className="nav-link">Search</NavLink>
            
            <div className="user-profile">
                <img className="user-image" src={userProfile} alt="user-profile" ></img> 
                <p>{username}</p>
                <button onClick={handleLogout} className="logout-button">Log out</button>
            </div>

        </div>
    )
}

export default LoggedInNavbar