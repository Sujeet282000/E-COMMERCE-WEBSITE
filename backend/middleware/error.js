const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {

  // --// console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // -----// Wrong mongodb Id error -- dalne par  ( castError bolte he isse ) -- isse bhi handle kar liya
  if (err.name === "CastError") {
    const message = `Resources not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  };

  //Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} value entered in the database.`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong JWT error
  if (err.token === "JsonWebToken") {
    const message = `Json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  //JWT Expire error
  if (err.token === "TokenExpireError") {
    const message = `Json web token is Expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,                  //error:err.stack  - mujhe full information of error dega use error ka sub kuch batyaga
    messageme: err.message,
  });
};