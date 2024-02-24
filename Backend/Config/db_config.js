// Importing the required dependencies here
const mongoose = require("mongoose");
require("dotenv").config()

//Establishing database connection
const dbConnection = mongoose.connect(process.env.MONGODB_URI);

//Exporting db connection for use in main app
module.exports = {dbConnection}