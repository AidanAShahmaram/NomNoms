import './SignUp.css'
import React, { useState } from 'react';
import axios from 'axios';
import Select from "react-select"
import logo from '../assets/logo-icononly.png';
import background from '../assets/business-signup-bg.jpg';


const cuisineOptions = [
    {value: "American", label: "American"},
    {value: "Brazilian", label: "Brazilian"},
    {value: "Bulgarian", label: "Bulgarian"},
    {value: "Chinese", label: "Chinese"},
    {value: "Cuban", label: "Cuban"},
    {value: "Ethiopian", label: "Ethiopian"},
    {value: "French", label: "French"},
    {value: "German", label: "German"},
    {value: "Guatemalan", label: "Guatemalan"},
    {value: "Indian", label: "Indian"},
    {value: "Indonesian", label: "Indonesian"},
    {value: "Iranian", label: "Iranian"},
    {value: "Italian", label: "Italian"},
    {value: "Japanese", label: "Japanese"},
    {value: "Jamaican", label: "Jamaican"},
    {value: "Korean", label: "Korean"},
    {value: "Mexican", label: "Mexican"},
    {value: "Moroccan", label: "Moroccan"},
    {value: "Nigerian", label: "Nigerian"},
    {value: "Peruvian", label: "Peruvian"},
    {value: "Russian", label: "Russian"},
    {value: "Taiwanese", label: "Taiwanese"},
    {value: "Thai", label: "Thai"},
    {value: "Venezuelan", label: "Venezuelan"},
    {value: "Vietnamese", label: "Vietnamese"}

];

const restaurantDescriptors = [
    {value: "breakfast", label: "Breakfast"},
    {value: "brunch", label: "Brunch"},
    {value: "buffet", label: "Buffet"},
    {value: "casual-dining", label: "Casual dining"},
    {value: "coffee shop", label: "Coffee Shop"},
    {value: "cozy", label: "Cozy"},
    {value: "family-friendly", label: "Family-friendly"},
    {value: "fast-food", label: "Fast Food"},
    {value: "fine-dining", label: "Fine Dining"},
    {value: "gluten-free", label: "Gluten-free"},
    {value: "gourmet", label: "Gourmet"},
    {value: "halal", label: "Halal"},
    {value: "healthy", label: "Healthy"},
    {value: "kosher", label: "Kosher"},
    {value: "organic", label: "Organic"},
    {value: "pet-friendly", label: "Pet-friendly"},
    {value: "pescetarian", label: "Pescetarian"},
    {value: "pub", label: "Pub"},
    {value: "romantic", label: "Romantic"},
    {value: "street-food", label: "Street Food"},
    {value: "sweets", label: "Sweets"},
    {value: "take-out", label: "Take out"},
    {value: "vegan", label: "Vegan"},
    {value: "vegetarian", label: "Vegetarian"}
];


export const BusinessSignUp = () => {

    const [username, setUsername] = useState("");
    const [restuarantName, setRestaurantName] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    // const [city, setCity] = useState(""); 
    // const [state, setState] = useState("");
    // const [zipCode, setZipCode] = useState(""); 
    const [phoneNumber, setPhoneNumber] = useState("");
    const [websiteLink, setWebsiteLink] = useState("");
    const [imageLink, setImageLink] = useState(""); 
    const [selectedCuisineOptions, setSelectedCuisineOptions] = useState([]);
    const [selectedRestaurantDescriptorsOptions, setSelectedRestaurantDescriptorsOptions] = useState([]);
    const [tags, setTags] = useState([]);

    const [user, setUser] = useState({});


    const handleSubmitSignUp = async (e) => {

        e.preventDefault();

        console.log();

        // this.setState(previousState => ({
        //     tags: [...previousState.tags, 'new value']
        // }));

        // var newArray = this.state.arr.slice();    
        // newArray.push("new value");   
        // setTags({arr:newArray});

        for(var i=0; i < selectedCuisineOptions.length; i++) {
            tags.push(selectedCuisineOptions[i].label);
        }

        for (var j=0; j < selectedRestaurantDescriptorsOptions.length; j++) {
            tags.push(selectedRestaurantDescriptorsOptions[j].label);
        }

        console.log("These are tags");
        console.log(tags);

        const signUpFormData = {
            username, 
            restuarantName,
            password, 
            address,
            phoneNumber,
            websiteLink,
            imageLink,
            tags
        }

        setUser(signUpFormData); 

        try {
            const response = await axios.post('http://localhost:3001/entrance/signup/owner', 
                { username: username, 
                password: password, 
                phone: phoneNumber,
                restaurant_name: restuarantName,
                address: address,
                website: websiteLink,
                image_link: imageLink,
                tags: tags
            });
            console.log("Response: " + response + "\n");
            alert("Successfully created an account!");
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.error('This username already exists. Please choose another one.');
                alert('This username already exists. Please choose another one.');
            }
            console.error(error.response);
            alert(error.response.data.msg);
        }
        
        //console.log("Status Code: " + statusCode);

        const jsonData = JSON.stringify(signUpFormData);

       
        
        console.log("JSON: " + jsonData + "\n \n");
        setTags([]);
    };

    const changeUsername = (event) => {
        setUsername(event.target.value)
        console.log("Username: " + event.target.value + "\n");
    }

    const changeRestaurantName = (event) => {
        setRestaurantName(event.target.value)
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
    /*
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
    */
    const changePhoneNumber = (event) => {
        setPhoneNumber(event.target.value)
        console.log("Phone Number: " + event.target.value + "\n");
    }

    const changeWebsiteLink = (event) => {
        setWebsiteLink(event.target.value)
        console.log("Website Link: " + event.target.value + "\n");
    }

    const changeImageLink = (event) => {
        setImageLink(event.target.value)
        console.log("Image Link: " + event.target.value + "\n");
    }

    const handleCuisineSelection = (selectedCuisineOption) => {
        // console.log(event.target);

        // // if (event.target !== 'undefined' && event.target.tagName === 'SELECT') {
        // const options = Array.from(event.target.selectedOptions, option => option.value);
        
        // setSelectedCuisineOptions(options);
        // console.log("Cuisine Options: " + options);

        // const options = event.map(option => option.value);
        setSelectedCuisineOptions(selectedCuisineOption);
        console.log(selectedCuisineOption);
        
       
    }

    const handleRestaurantSelection = (selectedOption) => {
        setSelectedRestaurantDescriptorsOptions(selectedOption);
        console.log(selectedOption);
    }

    const selectStyle = {
        control: (provided) => ({
          ...provided,
          width: '100%',  
          margin: '0 auto',
          borderRadius: '20px',
          borderWidth: '2px',
          borderColor: 'orange', 
          backgroundColor: 'lightyellow',
          textAlign: 'center'
        }),
        menu: (provided) => ({
          ...provided,
          width: '100%',  
          textAlign: 'center',
          
        }),
        option: (provided) => ({
            ...provided,
            textAlign: 'center', 
            
          }),
      
          // Style for the single option item selected
          singleValue: (provided) => ({
            ...provided,
            textAlign: 'center',     // Center the selected value text
          }),
      
    };

    const divStyle = {
        backgroundImage: `$({background})`,
        backgroundSize: 'cover',
    };
    return (
        <>

        <div className="signup-page">
            <div className="signup-img1" style={divStyle}></div>
            <div className="signup-right">
            
    
            <center>
                <img src={logo} alt="logo" className="signup-logo"></img>
            </center>

        <div className="business-signup-form">
        <form onSubmit={handleSubmitSignUp}>
            <div className="h1-signup">Business Sign Up</div>
            
            <div className="input-div">
                <label class="input-label" for="username"> Username </label>
                <input class="input-box" type="username" value={username} onChange={changeUsername} placeholder="Username" id="username" required></input>
            </div>

            <div className="input-div">
                <label class="input-label" for="restuarant-name"> Restaurant Name </label>
                <input class="input-box" type="restaurant-name" value={restuarantName} onChange={changeRestaurantName} placeholder="Restaurant Name" id="restaurant-name" required></input>
            </div>

            <div className="input-div">
                <label class="input-label" for="password"> Password </label>
                <input class="input-box" type="password" value={password} onChange={changePassword} placeholder="Password" id="password" required></input>
            </div>

            {/* <div className="input-div">
                <input class="input-box" type="password" value={password} onChange={changePassword} placeholder="Password" id="password" required></input>
                <label class="input-label" for="Address"> Address </label>
            </div> */}
            

            <div className="input-div">
                    <label class="input-label" for="Address"> Address </label>
                    <input class="input-box" type="address" value={address} onChange={changeAddress} placeholder="Address" id="address" required></input>   
            </div>
            
            {/*
            <div className="location-div">
                <div className="address-div1">
                    <label class="input-label" for="Address"> Address </label>
                    <input class="input-box" type="address" value={address} onChange={changeAddress} placeholder="Address" id="address" required></input>   
                </div>
                <div className="address-div2">
                    <label class="input-label" for="city"> City </label>
                    <input class="input-box" type="city" value={city} onChange={changeCity} placeholder="City" id="city" required></input>
                </div>
            </div>
            

            <div className="location-div">
            <div className="address-div3">
            <label class="input-label" for="state"> State </label>
            <select class="input-box" onChange={changeState} id="State">
                <option value="" disabled selected>Select a state</option>
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
            </div>
           
            <div className="address-div4">
                <label class="input-label" for="zipCode"> Zip Code </label>
                <input class="input-box" type="zipCode" value={zipCode} onChange={changeZipCode} placeholder="e.g., 90095" id="zipCode" required></input>
            </div>

            </div>
            */}

            <div className="input-div">
                <label class="input-label" for="phoneNumber"> Phone Number </label>
                <input class="input-box" type="tel" value={phoneNumber} onChange={changePhoneNumber} placeholder="(123) 456-7890" id="phoneNumber" required></input>
            </div>
            
            <div className="input-div">
                <label class="input-label" for="link"> Website Link </label>
                <input class="input-box" type="url" value={websiteLink} onChange={changeWebsiteLink} placeholder="https://website.com" id="websiteLink" required></input>
            </div>
         

            <div className="input-div">
                <label class="input-label" for="link"> Image Link </label>
                <input class="input-box" type="url" value={imageLink} onChange={changeImageLink} placeholder="https://website.com/image.png" id="websiteLink" required></input>
            </div>
            
           

            <div className="input-div">
                <label class="input-label" for="cuisine"> Cuisine </label>
                
                <Select options={cuisineOptions} value={selectedCuisineOptions} onChange={handleCuisineSelection} styles={selectStyle} isMulti={true}/>
                
            </div>
            
            <div className="input-div">
                <label class="input-label" for="restaurantDescriptionTags"> Restaurant Descriptors Tags </label>
                
                <Select options={restaurantDescriptors} value={selectedRestaurantDescriptorsOptions} onChange={handleRestaurantSelection} styles={selectStyle} isMulti={true}/>
                
            </div>

            <button class="submit">Sign Up</button>
          
        </form>

        </div>
        
        </div>
        </div>
        
        </>
    )

}

export default BusinessSignUp