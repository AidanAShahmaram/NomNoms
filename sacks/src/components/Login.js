import "./Login.css"
import React, { useState } from 'react';
import axios from "axios";
import logo from '../assets/logo-icononly.png';
import { createContext } from 'react';
import { useNavigate } from "react-router-dom";



export const Login = () => { 

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate(); 

    const handleSubmitLogin = async (e) => {

        e.preventDefault();
        
        const signUpFormData = {
            username, 
            password
        }

        try {
            const response = await axios.get('http://localhost:3001/entrance/login/user', {params: { username: username, password: password }});
            
            const tokenValue = response.data.token;
            sessionStorage.setItem("token", tokenValue);
            sessionStorage.setItem("username", username);
            const token = sessionStorage.getItem("token");
            
            console.log(response.status);

            if (response.status !== 200) {
                alert(response.data.msg);
            } else {
                navigate('/search');
            }
            
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Incorrect Password");
                alert("Incorrect Password.");
            } else if (error.response && error.response.status === 400) {
                console.error("Invalid Username");
                alert("Invalid Username");
            } else {
                alert("Error. No response from backend.");
            }
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
        <div className="login-div">
        
        <center><img src={logo} alt="logo" className="login-img"></img></center>

        <center><form onSubmit={handleSubmitLogin}>
            <div className="h1-login">Foodie Login</div>
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
            <button class="submit-login">Log In</button>
            <br></br>
            <br></br>
        </form>
        </center>

        </div>
    )
} 

export default Login
