// Import necessary dependencies
const Redis = require("ioredis");
require("dotenv").config();

// Create a redis instance
const redisClient = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  });
  
  redisClient.on("connect", () => {
    console.log("Connected to Redis Cloud");
  });
  
  redisClient.on("error", (err) => {
    console.error("Error connecting to Redis Cloud:", err);
  });

  module.exports = {redisClient}