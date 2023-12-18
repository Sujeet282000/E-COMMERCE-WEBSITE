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

// Get Single Order
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
