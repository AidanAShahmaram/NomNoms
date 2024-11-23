export const Navbar = () => {

    return (
        <div class="navbar">
            <img src="../../logo.png" alt="logo" height="30px;"></img>
            <a class="active" href="#home">Home</a>
            <a class="explore" href="explore">Explore</a>
            <a href="#AboutUs">About Us</a>
            <input type="searchbar" placeholder="Search for restaurants" id="searchbar"></input>
            <a href="./Login.js">Login</a>
            <a href="./SignUp.js">Sign up</a>
        </div>
    )
}


export default Navbar