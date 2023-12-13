// Import the Express library
const express = require("express");

// Import specific functions (registerUser and loginUser) from the userController module
const { registerUser, loginUser, logoutUser, forgotPassword } = require("../controllers/userController");

// Create an Express Router
const router = express.Router();

// Define routes using the router

// Handle POST requests to the "/register" endpoint by calling the registerUser function
router.route("/register").post(registerUser);

// Handle POST requests to the "/login" endpoint by calling the loginUser function
router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/logout").get(logoutUser);

// Export the router to make it accessible in other files
module.exports = router;
