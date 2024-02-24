const express = require("express");
const { signup, login, logout } = require("../Controllers/auth_controllers");
const { userAuth } = require("../Middlewares/user_auth_middleware");

const authRouter = express.Router();

authRouter.post("/signup",signup);
authRouter.post("/login",login);
authRouter.post("/logout",userAuth,logout);

module.exports = {authRouter};