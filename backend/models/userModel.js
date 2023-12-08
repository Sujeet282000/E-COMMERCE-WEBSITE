const mongoose = require("mongoose");
const validator = require("validator");
const { schema } = require("./productModel");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should have more than 6 characters"],
        select: false,   //Admin jab bhi User find karte samay password na de 

    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    },
    role: {
        type: String,
        dafault: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

module.exports = mongoose.model("User", userSchema);


/*

mongoose.model:

mongoose is a library for MongoDB object modeling in Node.js.
The model function is used to create or retrieve a model.
"Product":

The first argument to mongoose.model is the name of the MongoDB collection. In this case, it's "Product". This is the name that will be used when interacting with the MongoDB database.
productSchema:

The second argument is the schema definition for the "Product" collection. The schema defines the structure of documents (objects) that can be stored in the collection. It specifies the fields, types, validations, and other characteristics of the data.

*/