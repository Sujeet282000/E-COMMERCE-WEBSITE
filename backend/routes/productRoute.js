const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

// products get karne ka route
router.route("/products").get(isAuthenticatedUser,getAllProducts);

// product create karne ka route 
router.route("/product/new").post(createProduct)

//product update karne ka route // or function controller me banaya he
router.route("/product/:id").put(updateProduct)

router.route("/product/:id").delete(deleteProduct).get(getProductDetails)



module.exports = router