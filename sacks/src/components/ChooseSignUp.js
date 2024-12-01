import "./ChooseSignUp.css"
import logo from '../assets/logo-icononly.png';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


export const ChooseSignUp = () => {

    return (
        <>
            <div class="choose-signup">
                <center><img src={logo} alt="logo" className="choose-signup-img"></img></center>

                <div className="h1-choose-signup"> Welcome! </div>
                <div className="p-choose-signup"> Who would you like to sign up as? </div>
                <Link to="/signup"><button class="button"> Foodie </button></Link>
                <Link to="/businesssignup"><button class="button"> Business </button></Link>
            </div>
        </>
    )
}

export default ChooseSignUp