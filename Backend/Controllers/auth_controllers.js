const { User } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { redisClient } = require("../Config/ioredis_config");
require("dotenv").config()

const signup = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).send({
        status_code: 400,
        status: 0,
        message: "Failed to register!",
        error: "Insufficient information!",
        data: {},
      });
    }

    // Regular expressions for validation
    const nameRegex = /^[A-Za-z\s]{3,}$/; // Minimum 3 letters in the name
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/; // Basic username validation
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,16}$/; // Password with special char, number, uppercase, and 8-16 chars

    if (!nameRegex.test(name)) {
        return res.status(400).json({
          status_code: 400,
          message: "Failed to register",
          status: 0,
          data: {},
          error:
            "Name should be at least 3 letters long and should contain alphabets only!",
        });
      }
    
      if (!usernameRegex.test(username)) {
        return res.status(400).json({
          status_code: 400,
          message: "Failed to register",
          status: 0,
          data: {},
          error: "Invalid username format!",
        });
      }
    
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          status_code: 400,
          message: "Failed to register",
          status: 0,
          data: {},
          error:
            "Password must be 8-16 characters, contain at least one special character, one number, and one uppercase letter!",
        });
      }

      const isUser = await User.findOne({ username });
      if (isUser) {
        return res.status(401).json({
          status_code: 400,
          message: "Failed to register",
          status: 0,
          data: {},
          error: "User already exists with this username!",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      // Creating a new user in database
      const user = new User({
        username,
        name,
        password:hashedPassword,
      });
      await user.save();

      return res.status(200).json({
        status_code: 200,
        message: "User registered successfully!",
        status: 1,
        data: user,
        error: [],
      });
  } catch (error) {
    console.log("ERROR_REGISTERING_USER",error);
    return res.status(500).json({
      code: 500,
      message: "Internal Error!",
      error: error.message,
      data: {},
      status: 0,
    });
  }
};

const login = async(req,res)=>{
  //Retreiving user email and password from request body
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).json({
      code: 401,
      status: 0,
      data: {},
      message: "Login Failed!",
      error: "Insufficient Information!",
    });
  }
  try {
    // Checking for user in database
    const isUserPresent = await User.findOne({ username });

    // User not present in the database.
    if (!isUserPresent) {
      return res.status(404).json({
        code: 404,
        status: 0,
        data: {},
        message: "Login Failed!",
        error: "No user found. Please register!",
      });
    }

    // Password verification
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      isUserPresent.password
    );

    // If password is not correct
    if (!isPasswordCorrect) {
      return res.status(401).send({
        code: 401,
        status: 0,
        data: {},
        message: "Login Failed!",
        error: "Wrong Credentials!",
      });
    }

    // Generating access token and sending login success response
    const accessToken = jwt.sign(
      { userId: isUserPresent._id },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).send({
      code: 200,
      status: 1,
      data: { accessToken, user: isUserPresent },
      message: "Login Success!",
      error: [],
    });
  } catch (error) {
    console.log("[LOGIN ERROR]", error);
    return res.status(500).json({
      code: 500,
      status: 0,
      message: "Internal Server error!",
      data: {},
      error: error.message,
    });
  }
};

const logout = async(req,res)=>{
    try {
        const { user } = req;

        // Retrieve the token from the request headers
        const access_token = req.headers.authorization;
      
        // Add the token to the Redis blacklist with a short expiration time
        const tokenKey = `blacklisted_token:${user.userId}`;
      
        // Set the blacklisted token in Redis
        redisClient.setex(tokenKey, 3600 * 24, access_token, (err, result) => {
          if (err) {
            return res.status(500).json({
                status_code: 500,
              status: 0,
              data: {},
              message: "Logout Failed!",
              error: err.message,
            });
          }
          return res.status(200).json({
            status_code: 200,
            status: 1,
            data: {},
            message: "Logged out successfully",
            error: [],
          });
        });
    } catch (error) {
        console.log("ERROR_LOGGING_OUT",error);
        return res.status(500).send({
            status_code:500,
            status:0,
            message:"Internal Server Error!",
            error:error.message,
            data:{}
        })
    }
};

module.exports = {signup,login,logout};
