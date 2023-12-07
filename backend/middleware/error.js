const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {

  // --// console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

// -----// Wrong mongodb Id error -- dalne par  ( castError bolte he isse ) -- isse bhi handle kar liya
if(err.name === "CastError"){
  const message = `Resources not found. Invalid: ${err.path}`;
  err = new ErrorHandler(message, 400);
};
  
  res.status(err.statusCode).json({
    success: false,                  //error:err.stack  - mujhe full information of error dega use error ka sub kuch batyaga
    messageme: err.message,
  });
};