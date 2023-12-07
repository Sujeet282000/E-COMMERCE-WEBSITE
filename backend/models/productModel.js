const mongoose = require("mongoose");

// ab mujhe banana he product ka schema ki mujhe kyakya chahiye product ke andar like product name and uska description
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true
    },

    description: {
        type: String,
        required: [true, "Please Enter product Description"]
    },

    price: {
        type: Number,
        required: [true, "Please Enter product Price"]
    },

    rating: {
        type: Number,
        default: 0
    },

    //ham apni image host karne ke use karenge cloud mery because jab bhi ham image upload karenge hame ek public id or ek url milta he  or arrray me rakha iski ek wajah beacuse images hogi array of objects 
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    category: {
        type: String,
        required: [true, "Please Enter product Category"]

    },

    Stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    },

    numOfReviews: {
        type: Number,
        default: 0
    },


// array liya kyuki reveiew ek product ke bohot sare log de sakte he

    reviews: [
        {

            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true
            },
            Comment: {
                type: String,
                requied: true,
                maxlength: [280, "comment can not exceed 280 characters"]
            }

        }
    ],

    createAt:{
            type:Date,
            default:Date.now
    }

});

module.exports = mongoose.model("Product", productSchema);   // mongoose ke model ko export kare he