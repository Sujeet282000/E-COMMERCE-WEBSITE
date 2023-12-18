const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");



//**************Create Product - Admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;   //12121 Explanation Niche// isse or aache se samajna padega
    const product = await Product.create(req.body);

    if(!product){
        return next(new ErrorHander(`There was an error creating the product ${error.message}`, 500));
    }

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





//******************** */ Get Product Details or Get single product details

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




//********************* */ Update Product --Admin
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



//********************* */ Delete Product --Admin

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




//***********Middleware Functions ***********/

//*********************Create New Review or Upadate the Review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id, 
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

     // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHander('The Product you are looking for does not exist', 404));
    }

    //---Check if user has already reviewed this product

    let isReviewed = product.reviews.find((existingReview) => existingReview.user.toString() === req.user._id.toString());


    if (isReviewed) {

        // If the user has already reviewed the product, update the existing review
        product.reviews.forEach((existingReview) => {

            if (existingReview.user.toString() === req.user._id.toString()) {

                existingReview.rating = rating;
                existingReview.comment = comment;
            }

        });

    }
    else {
        // If the user has not reviewed the product, add a new review
        product.reviews.push(review);

        // Update the number of reviews
        product.numOfReviews = product.reviews.length;
    }


    // Calculate the average rating for ratings

    // Calculate the average rating
    let totalRating = 0;
    product.reviews.forEach((rev) => {
        totalRating += rev.rating;
    });
    // average rating
    product.ratings = totalRating / product.reviews.length;

    // let avg = 0;
    // product.ratings = product.reviews.forEach((rev) => {
    //     avg = avg + review.rating
    // }) / product.reviews.length;


    // Save the updated product
    await product.save({ validateBeforeSave: false });

    // Return a success response
    res.status(200).json({
        success: true,
    });

});




//************ Get All Reviews of a Single Product

exports.getSingleProductReview = catchAsyncErrors( async(req, res, next)=>{

    // Find the product by ID
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHander(`No product found with id ${req.query.productId}`,404));
    }

 console.log(product.ratings);

    res.status(200).json({
        success : true ,
        reviews: product.reviews,
    })

});




// ********************* Delete Review of a Single Product

exports.deleteReview = catchAsyncErrors( async(req, res, next)=>{

    // Find the product based on productId
    const product = await Product.findById(req.query.productId);

    // Check if the product exists
    if(!product){
        return next(new  ErrorHander(`No product found with id `,404));
    }


    //review banate hi usme aati he _id wo id he (rev._id.toString()),, 
    //or ye basic review id he jo ham req karte waqt dnege (req.query.id) or ham id wo denge jo hame delete karna he // ot ham sare wo review dundh lenge jo hame delete nahi karni he  // or wo ham reviews me save kar denge

    // to isme wo sare reviews homge jo hame delete nahi karna he kyuki ye wo filter kar raha he jo hame dlete nahi karna he
    

    // Use filter to exclude the review with the specified id (query parameter)
    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
      );
    
    console.log(reviews);



    //--obiously reviews nay he to rating bhi badalni padegi or ye sam or ek hi product me apply hogi

    // Calculate the average rating
    let totalRating = 0;
    reviews.forEach((rev) => {
        totalRating += rev.rating;
    });
    // average rating
    let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = totalRating / reviews.length;
  }
    console.log(Number(ratings));




    const numOfReviews = reviews.length;


    // Now update all the three things in a product

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews : reviews,
        ratings : Number(ratings),
        numOfReviews : numOfReviews,
    },{
        new: true,
        runValidators:true,
        useFindAndModify:false,

    });


    res.status(200).json({
        success : true ,
    })

})


























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
