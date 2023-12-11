const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");



// Create Product - Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;   //12121 Explanation Niche// isse or aache se samajna padega
    const product = await Product.create(req.body);

    res.status(201).json({
        succuss: true,
        product
    })
});




//Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
     
    //// ApiFeatures class ka instance banaya jata hai
    const api_Feature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter().pagination(resultPerPage);

     // Products ko retrieve karne ke liye modified query ka use kiya jata hai
    const products = await api_Feature.query;

    res.status(200).json({
        succuss: true,
        products,
        productCount
    });
});





// Get Product Details or Get single product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
    });
});




// Update Product --Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });


    res.status(200).json({
        succuss: true,
        product,
    });

});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }
    
    await product.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
});













/*
// **********12121

// Create Product - Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    // ... (rest of the code for creating a product)
});
```

Explanation:

- **Objective:**
  - This code is part of a function that handles the creation of a new product, and it's specifically designed for an admin user.

- **`req.body.user = req.user.id;`:**
  - The `req` object represents the incoming request to the server.
  - The `req.body` property contains the data sent in the request's body (e.g., when a user submits a form).
  - `req.user` is often used in authentication to represent the user who is currently logged in.
  - `req.user.id` is the unique identifier (id) of the currently logged-in user.

- **What It Does:**
  - The line of code sets the `user` field in the product creation data (`req.body.user`) to the id of the currently logged-in user (`req.user.id`).
  - In other words, it associates the new product with the user who is creating it.

- **Example:**
  - If an admin (authenticated user) is creating a new product, this line ensures that the product will be linked to that admin user.

In simpler terms, this code is making sure that when a new product is being created, it automatically knows which user (admin, in this case) is responsible for creating it. This helps keep track of who created each product in the system.

*/
