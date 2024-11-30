import "./Login.css"
import React, { useState } from 'react';
import axios from "axios";
import logo from '../assets/logo-icononly.png';



export const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmitLogin = async (e) => {

        e.preventDefault();
        
        const signUpFormData = {
            username, 
            password
        }


        try {
            const response = await axios.post('http://localhost:3000', { username: username, password: password });
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

    const changePassword = (event) => {
        setPassword(event.target.value)
        console.log("Password: " + event.target.value + "\n");
    }

    return (
        <>
        
        <center><img src={logo} alt="logo"></img></center>

        <center><form onSubmit={handleSubmitLogin}>
            <h1>Foodie Login</h1>
            <label class="input-label" for="username"> Username </label>
            <br></br>
            <input class="input-box" type="username" onChange={changeUsername} placeholder="Username" id="username" required></input>
            <br></br>
            <br></br>
            <label class="input-label" for="password"> Password </label>
            <br></br>
            <input class="input-box" type="password" onChange={changePassword} placeholder="Password" id="password" required></input>
            <br></br>
            <br></br>
            <button class="submit">Log In</button>
            <br></br>
            <br></br>
        </form>
        </center>

        </>
    )
} 

export default Login