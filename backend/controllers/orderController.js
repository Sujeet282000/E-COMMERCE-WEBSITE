const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    // Destructuring the request body
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    // Creating a new order
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user.id, // Assigning the user ID from the request
    });

    // Sending a response with the created order
    res.status(201).json({
        success: true,
        order,
    });
});



// *************** Get Single Order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    // Finding a single order by ID and populating user details (name, email)
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    // Handling the case where the order is not found
    if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
    }

    // Sending a response with the retrieved order
    res.status(200).json({
        success: true,
        order,
    });
});



// ***************************8
// Get logged-in user's Orders // user login hona chahiye

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    // Finding orders associated with the logged-in user // to database me sare orders dhudne he jisme user field me jo id ho, wo ho same hamare logged in user ki id se

    const orders = await Order.find({ user: req.user._id });

    // Sending a response with the user's orders
    res.status(200).json({
        success: true,
        orders,
    });
});



//Admin Route
///***************/ Get All Orders (Admin)

// This endpoint is restricted to admin users

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {

    // Retrieve all orders from the database
    const orders = await Order.find();

    // Calculate the total amount of all orders
    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount = totalAmount + order.totalPrice;
    });

    // Send a response with the list of all orders and total amount
    res.status(200).json({
        success: true,
        orders,
        totalAmount,
    });
});



// Admin Route
///***************/ Update Order Status (Admin)

// This endpoint is restricted to admin users

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {

    // Retrieve the order from the database using its ID
    const order = await Order.findById(req.params.id);

     // Check if the order exists
     if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
      }

    // Check if the order is already delivered
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHander('You have already delivered this order', 400));
    }

    // Update the stock for each item in the order
    order.orderItems.forEach(async (orderItem) => {
        await updateStock(orderItem.product, orderItem.quantity);
    });

    // Update the order status
    order.orderStatus = req.body.status;

    // If the status is 'Delivered', update the deliveredAt timestamp
    if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now();
    }

    // Save the updated order
    await order.save({ validatorBeforeSave: false });

    // Send a response indicating success
    res.status(200).json({
        success: true,
    });
});

// Function to update stock for a product
async function updateStock(id, quantity) {
    // Retrieve the product from the database using its ID
    const product = await Product.findById(id);

    // Decrease the stock based on the quantity in the order
    product.Stock -= quantity;

    // Save the updated product
    await product.save({ validateBeforeSave: false });
}











//***************** */ Delete Order -- Admin

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    // Retrieve the order from the database using its ID
    const order = await Order.findById(req.params.id);

    // Check if the order exists
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }

    // Remove the order from the database
    await order.deleteOne();

    // Send a response indicating success
    res.status(200).json({
      success: true,
    });
});
