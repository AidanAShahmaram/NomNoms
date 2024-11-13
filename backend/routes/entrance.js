// routes for users

const express = require('express');
const router = express.Router();
const User = require('../databases/userDatabase');
const Owner = require('../databases/userDatabase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const rounds = 10;


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

    
    return res.status(200).json({msg: "Success"});
});

// POST user sign up
//status codes: 403 = already exists
router.post('/signup/user', async (req, res) => {
    
    const {username, password, description} = req.body;
    const account = await User.findOne({username: username});
    if(account){
	return res.status(403).json({msg: "This username already exists"});
    }
    
    const passhash = await bcrypt.hashSync(password, rounds);
    const newData = new User({"username": username, "password": passhash, "description": description});
    const savedData = await newData.save();
    res.json(savedData);
    
  });
  

// routes for users

const express = require('express');
const router = express.Router();
const User = require('../databases/userDatabase');
const Owner = require('../databases/userDatabase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const rounds = 10;


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

    
    return res.status(200).json({msg: "Success"});
});

// POST user sign up
//status codes: 403 - already exists
router.post('/signup/user', async (req, res) => {
    
    const {username, password, description} = req.body;
    const account = await User.findOne({username: username});
    if(account){
	return res.status(403).json({msg: "This username already exists"});
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
//status codes: 403 - already exists
router.post('/signup/owner', async (req, res) => {
    
    const {username, password, restaurant, description} = req.body;
    const account = await Owner.findOne({username: username});
    if(account){
	return res.status(403).json({msg: "This username already exists"});
    }
    
    const passhash = await bcrypt.hashSync(password, rounds);
    const newData = new Owner({"username": username, "password": passhash, "restaurant": restaurant, "description": description});
    const savedData = await newData.save();
    res.json(savedData);
    
  });
