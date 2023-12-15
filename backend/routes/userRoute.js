// Import the Express library
const express = require("express");

// Import specific functions (registerUser and loginUser) from the userController module
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");



// Create an Express Router
const router = express.Router();

// Define routes using the router

// Handle POST requests to the "/register" endpoint by calling the registerUser function
router.route("/register").post(registerUser);

// Handle POST requests to the "/login" endpoint by calling the loginUser function
router.route("/login").post(loginUser);

// Handle POST requests to initiate the password reset process
router.route("/password/forgot").post(forgotPassword);

// Handle PUT requests to reset the user's password using a reset token
router.route("/password/reset/:token").put(resetPassword);

// Handle GET requests to log out the authenticated user
router.route("/logout").get(logoutUser);

// Handle GET requests to retrieve details of the authenticated user
router.route("/me").get(isAuthenticatedUser, getUserDetails);

// Handle PUT requests to update the password of the authenticated user
router.route("/password/update").put(isAuthenticatedUser, updatePassword);


// Export the router to make it accessible in other files
module.exports = router;
