const express  = require('express');

const app = express();       // Create an instance of the Express application

const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error")

// Use middleware to parse incoming JSON requests
app.use(express.json())

// Use the cookie-parser middleware
app.use(cookieParser());

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");


// In Express, app.use() is a method used to mount middleware functions or other routers at a specified path. Here, you are mounting the product and user routers under the path "/api/v1".// hame wo string batani chahiye jo hamesa add honi chahiye

app.use("/api/v1", product);    
app.use("/api/v1", user);

// Middleware for handling Errors
app.use(errorMiddleware)

module.exports = app 







