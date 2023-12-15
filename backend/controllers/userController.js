const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//-----Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a simple id",
            url: "this is a simple url",
        }
    });

    // const token = user.getJWTToken();
    sendToken(user, 201, res);

});




// ----=----Login User

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({email: email}).select("+password"); // sirf email bhi likh sakte he //selct use kiya kyuki password ko select:false kiya tha

    if (!user) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    const isPasswordMatched =  await user.comparePassword(password);
    console.log(isPasswordMatched);
    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    // const token = user.getJWTToken();
    sendToken(user, 200, res);

});


//-------------Logout User
// Middleware for logging out a user (clearing the authentication token cookie)

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    // Clear the "token" cookie by setting its value to null and expiring it
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    // Send a success response indicating successful logout
    res.status(200).json({
        success: true,
        message: "Logged Out",
    })
});




// ---------------------Forgot Password

// Define the route handler for the "forgot password" functionality

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    // Find the user by their email address
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHander("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    // Save the user with the reset token (turn off validation for this save)
    await user.save({ validateBeforeSave: false });

    // Construct the URL for password reset
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    // Create the message that will be sent in the email
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl}  \n\n If you have not requested this email then, Please ignore it`;


    // sab kuch tyaar ab mail send karna he so we use try catch block
    // Use a try-catch block to handle potential errors when sending the email

    try {
        // Send the password reset email
        await sendEmail({
            email: user.email,
            subject: `Ecommerce User Password Recovery`,
            message,
        });

        // Send a success response if the email is sent successfully
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        // If there's an error, clear the reset token and its expiration in the user model
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        // Save the user (turn off validation for this save)
        await user.save({ validateBeforeSave: false });

        // Return an error response
        console.log(error.message);

        return next(new ErrorHander(`There was an error sending the email${error.message}`, 500));
        // return next(new ErrorHander(error.message, 500));
    }

});






// ---------------------Reset Password

// Define the route handler for the "reset password" functionality

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {


    //Creating a token hash using the SHA256 algorithm
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    // Query the database to find a user with the provided resetPasswordToken
    // and a resetPasswordExpire timestamp greater than the current time
    const user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    // If no user is found, return an error indicating that the reset token is invalid or has expired
    if (!user) {
        return next(new ErrorHander("Reset Password Token is invalid or has been expired", 400));
    }

    // Check if the entered password and confirmPassword match
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander("Password does not match", 400));
    }

    // If the passwords match, update the user's password
    user.password = req.body.password;

    console.log("password update successfully");

    // Clear the resetPasswordToken and resetPasswordExpire fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Save the updated user object to the database
    await user.save();

    // Send a new authentication token as a response to the client
    sendToken(user, 200, res);
});





//---------------Get User Details 

//***********// ye wala route wahi access kar sakta he jisne pehle login kar rakha ho, and you know login karte hi kya hota he (user) mil jata he or ( req.user ) me pura user save ho jatahe, to aasa hoga hi nahi ki user na mile, kyuki req.user.id means req se hi access kar rahe he

//Or me isse aasa banauga ki jisne login kar rakha he wahi access kar sakta he ,[ it means (user) or (user) ] to apni hi detail wahi lega na login karne ke baad

// Retrieve user details by their ID and send as a JSON response
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {

    // Find the user in the database using their ID from the request object
    const user = await User.findById(req.user.id);

    // Respond with a JSON object containing the user details
    res.status(200).json({
        success: true,
        user,
    });
});





//------------ Update user password


exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

    // Find the user in the database by their ID, including the password field
    const user = await User.findById(req.user.id).select("+password");
  
    // Check if the provided old password matches the user's current password
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    // If the old password doesn't match, return an error response
    if (!isPasswordMatched) {
        return next(new ErrorHander("Old password is incorrect", 400));
    }
  
    // Check if the new password and confirm password match
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHander("Password does not match", 400));
    }
  
    // Update the user's password with the new password
    user.password = req.body.newPassword;
  
    // Save the updated user to the database
    await user.save();
  
    // Send a new authentication token as a response to the client
    sendToken(user, 200, res);
});
