const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getSingleProductReview, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


// ******* products get karne ka route
router.route("/products").get(getAllProducts);


//*************** */ product create karne ka route 
router.route("/admin/product/new").post(
    isAuthenticatedUser,        // Middleware to check if the user is authenticated
    authorizeRoles("admin"),    // Middleware to check if the user has the "admin" role
    createProduct               // Controller function for creating a new product
);


//******* product update karne ka route // or function controller me banaya he
router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

router.route("/admin/product/:id")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);


router.route("/product/:id").get(getProductDetails);

//********* route for create a review or update the review
router.route("/review").put(isAuthenticatedUser,createProductReview);


router.route("/reviews").get(getSingleProductReview).delete(isAuthenticatedUser, deleteReview); //getProductReviews

module.exports = router