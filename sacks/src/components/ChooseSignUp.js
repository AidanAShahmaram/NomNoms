import "./ChooseSignUp.css"
import logo from '../assets/logo-icononly.png';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


export const ChooseSignUp = () => {


    return (
        <>
            <div class="choose-signup">
                <center><img src={logo} alt="logo"></img></center>

                <h1> Welcome! </h1>
                <p> Who would you like to sign up as? </p>
                <Link to="/signup"><button class="button"> Foodie </button></Link>
                <Link to="/businesssignup"><button class="button"> Business </button></Link>
                
            </div>
            
        
        </>
    )

}

export default ChooseSignUp