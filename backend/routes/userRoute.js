// Import the Express library
const express = require("express");

// Import specific functions (registerUser and loginUser) from the userController module
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");



// Create an Express Router
const router = express.Router();

// Define routes using the router

// Handle POST requests to the "/register" endpoint by calling the registerUser function
router.route("/register").post(registerUser);

// Handle POST requests to the "/login" endpoint by calling the loginUser function
router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails);


// Export the router to make it accessible in other files
module.exports = router;
