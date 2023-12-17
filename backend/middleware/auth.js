const jwt = require("jsonwebtoken");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/userModel")



//********11111


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

    // oneline = req.user = await User.findById(decodeData._id);

    const userId = decodedData._id;
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
        // If the user does not exist, return an error response
        return next(new ErrorHander("User not found", 401));
    }

    //Attach the user object to the request for further use in routes
    req.user = user;
    console.log(req.user.role);

    // Move to the next middleware or route handler
    console.log("done from here");

    next();

});


// iske bad niche hi wala function hohga run


// *****************222222

// Middleware function to authorize user roles

exports.authorizeRoles = (...roles) => {

    // The middleware function that will be executed for each request
    return (req, res, next) => {

        // Check if the user's role is included in the allowed roles
        if (!roles.includes(req.user.role)) {

            // If not, return an error response indicating forbidden access (403)
            return next(new ErrorHander(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }

        // If the user's role is allowed, move to the next middleware or route handler
        // console.log("done from roles");


        next();

    };
};
