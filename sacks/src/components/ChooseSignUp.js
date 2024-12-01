import "./ChooseSignUp.css"
import logo from '../assets/logo-icononly.png';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import background from '../assets/signup-login-bg.png';


export const ChooseSignUp = () => {

    const divStyle = {
        backgroundImage: `url(${background})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        height: '100vh',
        width: '100vw', 
    };

    return (
        <>
            <div class="choose-signup" style={divStyle}>
                <center><img src={logo} alt="logo" className="choose-signup-img"></img></center>

                <div className="h1-choose-signup"> Welcome to NomNoms! </div>
                <div className="p-choose-signup"> Who would you like to sign up as? </div>
                <div className="choose-buttons">
                    <Link to="/signup"><button class="choose-button"> Foodie </button></Link>
                    <Link to="/businesssignup"><button class="choose-button"> Business </button></Link>
                </div>
                
            </div>
        </>
    )
}

export default ChooseSignUp