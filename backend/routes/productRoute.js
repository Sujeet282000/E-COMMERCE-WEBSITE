const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// products get karne ka route
router.route("/products").get(getAllProducts);

// product create karne ka route 
router.route("/product/new").post(
    isAuthenticatedUser,        // Middleware to check if the user is authenticated
    authorizeRoles("admin"),    // Middleware to check if the user has the "admin" role
    createProduct               // Controller function for creating a new product
);

//product update karne ka route // or function controller me banaya he
router.route("/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)

router.route("/product/:id")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
    .get(getProductDetails)



module.exports = router