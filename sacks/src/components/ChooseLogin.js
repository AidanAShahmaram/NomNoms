import "./ChooseLogin.css"
import logo from '../assets/logo-icononly.png';
import background from '../assets/signup-login-bg.png';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



export const ChooseLogin = () => {
    const divStyle = {
        backgroundImage: `url(${background})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        height: '100vh',
        width: '100vw', 
    };

    return (
        <>
            <div class="choose-login" style={divStyle}>
                <center><img src={logo} alt="logo" className="choose-login-img"></img></center>

                <div className="h1-choose-login"> Welcome! </div>
                <div className="p-choose-login"> Who are you logging in as today? </div>
                <div className="choose-buttons">
                    <Link to="/login"><button class="choose-button"> User </button></Link>
                    <Link to="/businesslogin"><button class="choose-button"> Business </button></Link> 
                </div>
                
            </div>
            
        
        </>
    )

}

export default ChooseLogin