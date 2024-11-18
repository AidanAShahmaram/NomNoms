// routes for users

const express = require('express');
const router = express.Router();
const User = require('../databases/userDatabase');
const Owner = require('../databases/userDatabase');
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
    const {username, password} = req.body;
    
    //checks if account exists
    const account = await User.findOne({username: username});
    console.log(account);
    if(!account)
	return res.status(400).json({msg: "Invalid Username"});

    const validPass = bcrypt.compare(password, account.password, (err, res) => {
	if(err){
	    return res.status(401).json({msg: "Incorrect Password"});
	}
    });


    //creates token for client side
    //token will become inavlid after the time specified
    const token = jwt.sign({ "username": username,
			    msg: "Successful Login"},
			   REPLACE,
			   { expiresIn: '1h'});
			   
			   

    
    return res.status(200).json({ token });
});

// POST user sign up
//status codes: 403 - already exists, 400 - invalid password creation
router.post('/signup/user', async (req, res) => {
    
    const {username, password, description} = req.body;
    const account = await User.findOne({username: username});
    if(account){
	return res.status(403).json({msg: "This username already exists"});
    }

    p_check = password_check(password)

    if(!p_check.valid){
	return res.status(400).json({msg: p_check.msg});
    }
    
    const passhash = await bcrypt.hashSync(password, rounds);
    const newData = new User({"username": username, "password": passhash, "description": description});
    const savedData = await newData.save();
    res.json(savedData);
    
  });
  



//GET owner authentication
//status codes: 200 - success, 400 - username not found, 401 - passwords does not match
router.get('/login/owner', async (req, res) => {
    const {username, password} = req.body;
    
    //checks if account exists
    const account = await Owner.findOne({username: username});
    console.log(account);
    if(!account)
	return res.status(400).json({msg: "Invalid Username"});

    const validPass = bcrypt.compare(password, account.password, (err, res) => {
	if(err){
	    return res.status(401).json({msg: "Incorrect Password"});
	}
    });

    
    return res.status(200).json({msg: "Success"});
});

// POST owner sign up
//status codes: 403 - already exists, 400 - invalid password creation
router.post('/signup/owner', async (req, res) => {
    
    const {username, password, restaurant, description} = req.body;
    const account = await Owner.findOne({username: username});
    if(account){
	return res.status(403).json({msg: "This username already exists"});
    }

    p_check = password_check(password)

    if(!p_check.valid){
	return res.status(400).json({msg: p_check.msg});
    }
    
    const passhash = await bcrypt.hashSync(password, rounds);
    const newData = new Owner({"username": username, "password": passhash, "restaurant": restaurant, "description": description});
    const savedData = await newData.save();
    res.json(savedData);
    
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

