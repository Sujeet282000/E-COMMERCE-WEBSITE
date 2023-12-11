const jwt = require("jsonwebtoken");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/userModel")

// Middleware for authenticating users based on a token stored in a cookie
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

     // Extract the 'token' value from the 'cookies' object in the request
    const { token } = req.cookies;   //sirf token value

   // Check if a token exists
   if (!token) {
    // If no token is present, return an error response
        return next(new ErrorHander("Please Login to access this resource", 401));
    }

    //if token agarmil gya phir kya 
    //// Assuming 'jwt' is the jsonwebtoken module
    // 'token' is the JWT token to be verified
    // 'process.env.JWT_SECRET' is the secret key used to sign the JWT

    // Use the 'verify' method of the 'jsonwebtoken' module to verify the JWT token
    // and decode the information stored in the token using the provided secret key.
    // The 'verify' method throws an error if the token is invalid or expired.


    // Verify the authenticity of the token and decode the information stored in it
    
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // jab hamne jwt token banaya tha to id assign ki thi, to ham wo id access kar lenge decodedData me se id 

    // Assuming 'User' is your user model
    // Retrieve the user from the database based on the decoded user ID
    // jab tak user login rahega to me user ka data req me access kar sakta hu kabhi bhi
    const userId = decodedData._id;
    req.user = await User.findById(userId);

    // Move to the next middleware or route handler
    next();

});