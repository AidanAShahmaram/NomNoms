import "./ChooseLogin.css"
import logo from '../assets/logo-icononly.png';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



export const ChooseLogin = () => {


    return (
        <>
            <div class="choose-login">
                <center><img src={logo} alt="logo"></img></center>
                <h1> Welcome! </h1>
                <p> Who are you logging in as today? </p>
                <Link to="/login"><button class="button"> User </button></Link>
                <Link to="/businesslogin"><button class="button"> Business </button></Link>
                
            </div>
            
        
        </>
    )

}

export default ChooseLogin