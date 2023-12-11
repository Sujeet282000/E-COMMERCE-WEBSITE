const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

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

    const user = await User.findOne({ email: email }).select("+password"); // sirf email bhi likh sakte he //selct use kiya kyuki password ko select:false kiya tha

    if (!user) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    const isPasswordMatched = user.comparePassword(password);
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