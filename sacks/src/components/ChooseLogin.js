import "./ChooseLogin.css"

import { Link } from 'react-router-dom';


export const ChooseLogin = () => {


    return (
        <>
            <div class="choose-login">
                <center><img src="../../logo.png" alt="logo"></img></center>
                <h1> Welcome! </h1>
                <p> Who are you logging in as today? </p>
                <button class="button"><a href={"./Login.js"}> User </a></button>
                <button class="button"><a href={"./BusinessLogin.js"}> Business </a></button>
                
            </div>
            
        
        </>
    )

}

export default ChooseLogin