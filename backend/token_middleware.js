const jwt = require('jsonwebtoken');

//Middleware for handling the token (for owner id retrieval)
//Will automatically look in middleware for this function
function decodeToken(req, res, next){
    const token = req.header('Authorization');
  //Authorization = request header
  try{
      const decoded = jwt.verify(token, 'fakeKey');
      req.owner_token = decoded.owner_token;
      next(); //need next to continue to route handler/next middleware
  } catch(error){
    res.status(401).json({error: "No token found"});
  }
}
module.exports = decodeToken;
