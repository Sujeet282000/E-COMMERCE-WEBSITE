// Import the Express library
const express = require("express");

// Import specific functions (registerUser and loginUser) from the userController module
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUsersDetails, updateUserRole, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");



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

// Handle PUT requests to update the profile of the authenticated user
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

//Admin role means = jo sirf admin access kar sakta he
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);


//Admin role means = jo sirf admin access kar sakta he //same routes different method
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUsersDetails);
router.route("/admin/user/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);
router.route("/admin/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);



// Export the router to make it accessible in other files
module.exports = router;
