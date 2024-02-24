// Importing necessary modules
const jwt = require("jsonwebtoken");
const { redisClient } = require("../Config/ioredis_config");
require("dotenv").config();

// Logic for user authentication
const userAuth = async (req, res, next) => {
  //Getting the access token from request headers
  const access_token = req.headers.authorization;
  // console.log(access_token)
  //Checking if access token has been passed or not
  if (!access_token) {
    // console.log("No access token provided!")
    return res.status(400).json({ 
      status:0,
      data:{},
      message: "Authentication Failed!",
      error:"No token provided, please login!"
      
    });
  }

 

  // verifying the token and moving to next route
  jwt.verify(
    access_token,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    (err, payload) => {
      if (err) {
        return res.status(400).send({
          status:0,
          data:{},
          message: "Authentication Failed!",
          error:err.message
          });
      } else if (payload) {
        // Setting the user Id in request.user object
        req.user = { userId: payload.userId };

        const tokenKey = `blacklisted_token:${req.user.userId}`;

        // Check if the token is blacklisted in Redis
        redisClient.get(tokenKey, (err, blacklistedToken) => {
          if (blacklistedToken === access_token) {
            return res.status(401).json({
                 status:0,
                 data:{},
                 message: "Authentication Failed!",
                 error:"Token has been blacklisted, please login again"
                });
          }
          else{
            next();
          }
        });
        
      }
    }
  );
};

module.exports = { userAuth };