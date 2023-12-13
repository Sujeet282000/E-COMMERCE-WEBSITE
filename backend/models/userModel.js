const mongoose = require("mongoose");
const validator = require("validator");
const { schema } = require("./productModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
        select: false,   //Admin jab bhi User find kare to us samay password na de 

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
        default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});




// ----------------------------------------------
//*********PASSWORD HASHING*********
// dont forger its an EVENT
// ------------------------------------------------------
//----Mongoose middleware to hash the password before saving 

//  The pre('save', ...) middleware is registered on the userSchema, which means it will run before saving a user to the database.


userSchema.pre("save", async function (next) {

    // Check if the password is modified or if it's a new user --> if not do it
    if (!this.isModified('password')) {
        return next();
    }

    //if yes then do it
    this.password = await bcrypt.hash(this.password, 10);

    // this line shows this const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(user.password, salt);
    //user.password = hashedPassword;
});




// -----------------------------------------------
// JWT TOKEN
//  // Method to generate JWT for user // HERE WE USE FUNCITON INSTEAD OF ARROW FUNCION BAECAUSE WE USE THIS IN FUNCTION BUT NOT IN ARROW FUNCTION

userSchema.methods.getJWTToken = function () {
    const user = this;

    // Generate a JWT with user information // means ham log JWT token bana rahe he thike

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });     //ye ham bana rahe he jwt Replace 'your-secret-key' with a secret key

    return token;
};


// ----------------------------------------------------------
// Compare Method
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);   // this ka matlab userSchema khud (individual user) to uske password ka hash mil jayga
}


// ---------------------------------------------------------------
//-- Generating Password Reset token

//-- HERE WE USE FUNCITON INSTEAD OF ARROW FUNCION BAECAUSE WE USE THIS IN FUNCTION BUT NOT IN ARROW FUNCTION

userSchema.methods.getResetPasswordToken = function () {
    
    // Generate a random reset token // to isse ho jayga generate
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash the token and set to userSchema resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set expire time for this token
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 3
    // Minutes

    // ye dono fileds to isi schema me save ho gayi he aditis // or ham return kar denge resetToken abhi batauga kyu kara resetToken return instead of this resetPasswordToken
    return resetToken;
    
}


module.exports = mongoose.model("User", userSchema);





/*

*****8/********* 
//module.exports = mongoose.model("User", userSchema);

mongoose.model:

mongoose is a library for MongoDB object modeling in Node.js.
The model function is used to create or retrieve a model.
"Product":

The first argument to mongoose.model is the name of the MongoDB collection. In this case, it's "Product". This is the name that will be used when interacting with the MongoDB database.
productSchema:

The second argument is the schema definition for the "Product" collection. The schema defines the structure of documents (objects) that can be stored in the collection. It specifies the fields, types, validations, and other characteristics of the data.

*/