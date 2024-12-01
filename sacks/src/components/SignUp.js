import './SignUp.css'
import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo-icononly.png';

export const SignUp = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const handleSubmitSignUp = async (e) => {

        e.preventDefault();
        
        const signUpFormData = {
            username, 
            email,
            password
        }


        try {
            const response = await axios.post('http://localhost:3000', { username: username, email: email, password: password });
            console.log("Response: " + response + "\n");
        } catch (error) {
            console.error(error.response);
        }


        

        const jsonData = JSON.stringify(signUpFormData);

        
        console.log("JSON: " + jsonData + "\n \n");
     
    };

    const changeUsername = (event) => {
        setUsername(event.target.value)
        console.log("Username: " + event.target.value + "\n");
    }

    const changeEmail = (event) => {
        setEmail(event.target.value)
        console.log("Email: " + event.target.value + "\n");
    }

    const changePassword = (event) => {
        setPassword(event.target.value)
        console.log("Password: " + event.target.value + "\n");
    }

    return (
        <>

        <center><img src={logo} alt="logo" className="signup-img"></img></center>

        <form onSubmit={handleSubmitSignUp}>
            <div className="h1-signup">Foodie Sign Up</div>
            <label class="input-label" for="username"> Create Username </label>
            <br></br>
            <input class="input-box" type="username" value={username} onChange={changeUsername} placeholder="Username" id="username" required></input>
            <br></br>
            <br></br>
            <label class="input-label" for="email"> Email </label>
            <br></br>
            <input class="input-box" type="email" value={email} onChange={changeEmail} placeholder="Email" id="email" required></input>
            <br></br>
            <br></br>
            <label class="input-label" for="password"> Password </label>
            <br></br>
            <input class="input-box" type="password" value={password} onChange={changePassword} placeholder="Password" id="password" required></input>
            <br></br>
            <br></br>
            
            <button class="submit">Sign Up</button>
            <br></br>
            <br></br>
        </form>
        
        
        
        </>
    )

}

export default SignUp