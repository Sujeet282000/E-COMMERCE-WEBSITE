const mongoose = require("mongoose");

// mongoose.connect("mongo://localhost:27017/Ecommerce", )

const connectDatabase = ()=>{
    // Database connection URL
const uri = process.env.DB_URI; // Replace 'mydatabase' with your actual database name

// Connect to the database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((data) => {
    console.log(`Connected to the database: ${data.connection.host}`);
  })
  // .catch((error) => {
  //   console.error('Database connection error:', error);   // ye hataya kyuki isse unhandled promise banana tha to ab ye unhandled he
  // });
}

module.exports = connectDatabase