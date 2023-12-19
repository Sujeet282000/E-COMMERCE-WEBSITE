const express = require("express");
const router = express.Router();

// Importing middleware for user authentication and role authorization
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Importing order controller methods
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");

// Define routes for handling orders

// Route to create a new order (accessible only to authenticated users)
router.route("/order/new").post(isAuthenticatedUser, newOrder);

// Route to get details of a single order by its ID (accessible only to authenticated users)
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

// Route to get all orders for the logged-in user (accessible only to authenticated users)
router.route("/orders/me").get(isAuthenticatedUser, myOrders);


// Admin Routes:

// Route to get all orders (accessible to admin users)
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

// Route to update and delete a specific order by ID (accessible to admin users)
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);




// Export the router for use in the application
module.exports = router;
