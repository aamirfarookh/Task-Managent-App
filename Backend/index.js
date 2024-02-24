const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 4500;
const { dbConnection } = require("./Config/db_config");
const { authRouter } = require("./Routes/auth.routes");
const { userAuth } = require("./Middlewares/user_auth_middleware");
const { taskRouter } = require("./Routes/tasks.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/tasks",userAuth,taskRouter);


app.listen(port,async()=>{
    try {
       console.log("Server is running on port 4500");
       await dbConnection;
       console.log("Connected to database [MongoDB]"); 
    } catch (error) {
        console.log(error);
    }
})