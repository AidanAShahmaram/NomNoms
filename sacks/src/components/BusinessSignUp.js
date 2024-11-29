import './SignUp.css'
import React, { useState } from 'react';
import axios from 'axios';

export const BusinessSignUp = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState(""); 
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState(""); 
    const [phoneNumber, setPhoneNumber] = useState("");
    const [websiteLink, setWebsiteLink] = useState(""); 
    const [descriptionTags, setDescriptionTags] = useState("");


    const handleSubmitSignUp = async (e) => {

        e.preventDefault();
        
        const signUpFormData = {
            username, 
            email,
            password, 
            address,
            city, 
            state,
            zipCode,
            phoneNumber,
            websiteLink,
            descriptionTags
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

    const changeAddress = (event) => {
        setAddress(event.target.value)
        console.log("Address: " + event.target.value + "\n");
    }

    const changeCity = (event) => {
        setCity(event.target.value)
        console.log("City: " + event.target.value + "\n");
    }

    const changeState = (event) => {
        setState(event.target.value)
        console.log("State: " + event.target.value + "\n");
    }

    const changeZipCode = (event) => {
        setZipCode(event.target.value)
        console.log("Zip Code: " + event.target.value + "\n");
    }

    const changePhoneNumber = (event) => {
        setPhoneNumber(event.target.value)
        console.log("Phone Number: " + event.target.value + "\n");
    }

    const changeWebsiteLink = (event) => {
        setWebsiteLink(event.target.value)
        console.log("Website Link: " + event.target.value + "\n");
    }

    return (
        <>
            
        <form onSubmit={handleSubmitSignUp}>
            <h1>Business Sign Up</h1>
            <label class="input-label" for="username"> Username </label>
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
            <label class="input-label" for="Address"> Address </label>
            <br></br>
            <input class="input-box" type="address" value={address} onChange={changeAddress} placeholder="Address" id="address" required></input>
            <br></br>
            <br></br>
            <label class="input-label" for="city"> City </label>
            <br></br>
            <input class="input-box" type="city" value={city} onChange={changeCity} placeholder="City" id="city" required></input>
            <br></br>
            <br></br>
            <label class="input-label" for="state"> State </label>
            <br></br>
            <select class="input-box">
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="Arizona">Arizona</option>
                <option value="Arkansas">Arkansas</option>
                <option value="American Samoa">American Samoa</option>
                <option value="California">California</option>
                <option value="Colorado">Colorado</option>
                <option value="Connecticut">Connecticut</option>
                <option value="Delware">Delware</option>
                <option value="District of Columbia">District of Columbia</option>
                <option value="Florida">Florida</option>
                <option value="Georgia">Georgia</option>
                <option value="Guam">Guam</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Idaho">Idaho</option>
                <option value="Illinois">Illinois</option>
                <option value="Indiana">Indiana</option>
                <option value="Iowa">Iowa</option>
                <option value="Kansas">Kansas</option>
                <option value="Kentucky">Kentucky</option>
                <option value="Louisiana">Louisiana</option>
                <option value="Maine">Maine</option>
                <option value="Maryland">Maryland</option>
                <option value="Massachusetts">Massachusetts</option>
                <option value="Michigan">Michigan</option>
                <option value="Minnesota">Minnesota</option>
                <option value="Mississippi">Mississippi</option>
                <option value="Missouri">Missouri</option>
                <option value="Montana">Montana</option>
                <option value="Nebraska">Nebraska</option>
                <option value="Nevada">Nevada</option>
                <option value="New Hampshire">New Hampshire</option>
                <option value="New Jersey">New Jersey</option>
                <option value="New Mexico">New Mexico</option>
                <option value="New York">New York</option>
                <option value="North Carolina">North Carolina</option>
                <option value="North Dakota">North Dakota</option>
                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                <option value="Ohio">Ohio</option>
                <option value="Oklahoma">Oklahoma</option>
                <option value="Oregon">Oregon</option>
                <option value="Pennsylvania">Pennsylvania</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Rhode Island">Rhode Island</option>
                <option value="South Carolina">South Carolina</option>
                <option value="South Dakota">South Dakota</option>
                <option value="Tennessee">Tennessee</option>
                <option value="Texas">Texas</option>
                <option value="Utah">Utah</option>
                <option value="Vermont">Vermont</option>
                <option value="Virginia">Virginia</option>
                <option value="Virgin Islands">Virgin Islands</option>
                <option value="Washington">Washington</option>
                <option value="West Virginia">West Virginia</option>
                <option value="Wisconsin">Wisconsin</option>
                <option value="Wyoming">Wyoming</option>
            </select>
            <br></br>
            <br></br>

            <label class="input-label" for="zipCode"> Zip Code </label>
            <br></br>
            <input class="input-box" type="zipCode" value={zipCode} onChange={changeZipCode} placeholder="e.g., 90095" id="zipCode" required></input>
            <br></br>
            <br></br>

            <label class="input-label" for="phoneNumber"> Phone Number </label>
            <br></br>
            <input class="input-box" type="tel" value={phoneNumber} onChange={changePhoneNumber} placeholder="(123) 456-7890" id="phoneNumber" required></input>
            <br></br>
            <br></br>

            <label class="input-label" for="link"> Website Link </label>
            <br></br>
            <input class="input-box" type="url" value={websiteLink} onChange={changeWebsiteLink} placeholder="website.com" id="websiteLink" required></input>
            <br></br>
            <br></br>

            <label class="input-label" for="descriptionTags"> Description Tags </label>
            <br></br>

            <br></br>
            <br></br>

            <button class="submit">Sign Up</button>
            <br></br>
            <br></br>
        </form>
        
        
        
        </>
    )

}

export default BusinessSignUp