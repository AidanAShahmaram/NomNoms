import './SignUp.css'
import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo-icononly.png';
import img1 from '../assets/signup-img1.png';
import { useNavigate } from "react-router-dom";

export const SignUp = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate(); 

    const handleSubmitSignUp = async (e) => {

        e.preventDefault();
        
        const signUpFormData = {
            username, 
            // // email,
            password
        }


        try {
            const response = await axios.post('http://localhost:3001/entrance/signup/user', { username: username, password: password, email: email });
            console.log("Response: " + response + "\n");
            if (response.status !== 200) {
                alert(response.data.msg);
            } else {
                navigate("/login");
            }
            
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Password must be between 8-20 characters.');
                alert('Password must be between 8-20 characters.');
            } else if (error.response && error.response.status === 403) {
                console.error('This username already exists. Please choose another one.');
                alert('This username already exists. Please choose another one.');
            } else {
                alert("Error. No response from backend.");
            }
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

    const divStyle = {
        backgroundImage: `url(${img1})`, 
        backgroundSize: 'cover',
    };

    return (
        
        <div className="signup-page">
            <div className="signup-img" style={divStyle}></div>
            <div className="signup-right">
            <div className="signup-form">

           
            <center><img src={logo} alt="logo" className="signup-logo"></img></center>

            <form onSubmit={handleSubmitSignUp}>
                <div className="h1-signup">Foodie Sign Up</div>

            <div className="signup-inputs">
                <div className="input-div">
                    <label class="input-label" for="username"> Create Username </label>
                    <input class="input-box" type="username" value={username} onChange={changeUsername} placeholder="Username" id="username" required></input>
                </div>

                <div className="input-div">
                    <label class="input-label" for="email"> Email </label>
                    <input class="input-box" type="email" value={email} onChange={changeEmail} placeholder="Email" id="email" required></input>
                </div>
                
                <div className="input-div">
                    <label class="input-label" for="password"> Password </label>
                    <input class="input-box" type="password" value={password} onChange={changePassword} placeholder="Password" id="password" required></input>
                </div>
            </div>  
                <button class="submit">Sign Up</button>
             
        </form>

        </div>
        
        </div>
        
        </div>
    )

}

export default SignUp