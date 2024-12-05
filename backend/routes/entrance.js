// routes for entrance

const express = require('express');
const router = express.Router();
const User = require('../databases/userDatabase');
const Owner = require('../databases/ownerDatabase');
const Restaurant = require('../databases/restaurantDatabase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const rounds = 10;

//When server is run, token_key should be placed in the .env file
//however for testing a fake key will be used
const REPLACE = "fakeKey";


// Define a route
router.get('/', async(req, res) => {
    res.send('Users Page');// this gets executed when user visit http://localhost:3000/users
});

//GET user authentication
//status codes: 200 - success, 400 - username not found, 401 - passwords does not match
router.get('/login/user', async (req, res) => {
    const {username, password} = req.query;

    //checks that a username and password are given
    if(!username || !password){
	return res.status(400).json({msg: "Missing parameters: requires a \"username\" and \"password\""})
    }
    
    //checks if account exists
    const account = await User.findOne({username: username});
    
    if(!account)
	return res.status(400).json({msg: "Invalid Username"});

    let cont = true

    const validPass = await bcrypt.compare(password, account.password);

    if(!validPass){
	return res.status(401).json({msg: "Incorrect Password"});
    }


    //creates token for client side
    //token will become inavlid after the time specified
    const token = jwt.sign({ "username": username,
			    msg: "Successful Login"},
			   REPLACE,
			   { expiresIn: '1h'});
			   
    return res.status(200).json({ "token": token });
});

// POST user sign up
//status codes: 403 - already exists, 400 - invalid password creation
router.post('/signup/user', async (req, res) => {
    const {username, email, password} = req.body;

    //checks that a username and password are given
    if(!username || !password || !email){
	return res.status(400).json({msg: "Missing parameters: requires a 'username', 'password', and 'email"})
    }

    //checks for existing user
    const account = await User.findOne({username: username});
    if(account){
	return res.status(403).json({msg: "This username already exists"});
    }

    //makes sure password is valid
    p_check = password_check(password)
    if(!p_check.valid){
	return res.status(400).json({msg: p_check.msg});
    }
    
    const passhash = await bcrypt.hashSync(password, rounds);
    const newData = new User({"username": username, "password": passhash, "email": email});
    const savedData = await newData.save();
    res.status(200).json({"account": savedData});
    
  });
  



//GET owner authentication
//status codes: 200 - success, 400 - username not found, 401 - passwords does not match
router.get('/login/owner', async (req, res) => {
    const {username, password} = req.query;

    //checks that a username and password are given
    if(!username || !password){
	return res.status(400).json({msg: "Missing parameters: requires a \"username\" and \"password\""})
    }
    
    //checks if account exists
    const account = await Owner.findOne({username: username});
    
    if(!account)
	return res.status(400).json({msg: "Username does not exist"});
    
    const validPass = await bcrypt.compare(password, account.password);

    if(!validPass){
	return res.status(401).json({msg: "Incorrect Password"});
    }

    //creates token for owner side -> need this for restaurants to be added to specific account
    //token will become invalid after the time specified
    const token = jwt.sign({
            owner_token: account._id, //_id automatically created by mongo database
            msg: "Successful Login"},
       REPLACE,
       { expiresIn: '1h'});
       
    return res.status(200).json({ token });
});

// POST owner sign up
//status codes: 403 - already exists, 400 - invalid password creation
router.post('/signup/owner', async (req, res) => {
    const {username, password, phone, restaurant_name, address, website, image_link, tags} = req.body;

    console.log(tags);

    //checks that a username and password are given
   
    if(!username || !password || !phone || !website || !restaurant_name || !address || !website || !image_link || !tags){
	return res.status(400).json({msg: "Missing parameters: make sure the following parameters are provided: username, password, phone, website, image, restaurant_name, address, website, image_link, tags"})
    }
    
    const account = await Owner.findOne({username: username});
    const rest_acc = await Owner.findOne({name: restaurant_name})
    if(account || rest_acc){
	return res.status(403).json({msg: "This username or restaurant already exists"});
    }

    p_check = password_check(password)

    if(!p_check.valid){
	return res.status(400).json({msg: p_check.msg});
    }
    
    let tag_list = [];
    for(i = 0; i < tags.length; i++){
	tag_list.push(tags[i]);
    }

    console.log(tag_list);

    
    const passhash = await bcrypt.hashSync(password, rounds);
    const newRest = await new Restaurant({name: restaurant_name, "address": address, "phone": phone, "website": website, "image_link": image_link, "tags": tag_list, "comments": []});
    const newData = new Owner({"username": username, "password": passhash, "restaurant": newRest._id});
    await newRest.save();
    await newData.save();
    res.status(200).json({"msg": newData._id});
    
})

function password_check(pass){
    const regex = /^[a-zA-Z0-9!@#$%^&*_+;':?><,.~=-]+$/;
    if(pass.length < 8){
	return({valid: false, msg: "password is too short"});
    } else if (pass.length > 20) {
	return({valid: false, msg: "password is too long"});
    } else if(!regex.test(pass)){
	return({valid: false, msg: "password contains invalid character(s) - valid characters include: a-zA-Z0-9!@#$%^&*_+;':?><,.~=-"});
    }

    return {valid: true, msg: "valid password"};
	
}
    

// export the router module so that server.js file can use it
module.exports = router;

