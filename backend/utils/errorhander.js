class ErrorHander extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this,this.constructor);

    }
    
}

module.exports = ErrorHander


/*

// Yeh class `ErrorHandler` naam se ek error handle karne wali class hai, jo Error class ko extend karti hai.
class ErrorHandler extends Error {
    // Yeh constructor method jab bhi ek new instance (object) banta hai, tab call hota hai.
    constructor(message, statusCode) {
      // `super` keyword se hum Error class ke constructor ko call kar rahe hain, jisme error message set hota hai.
      super(message);
  
      // Yahan hum `statusCode` property set kar rahe hain jo ki HTTP status code represent karega.
      this.statusCode = statusCode;
  
      // `isOperational` property ko `true` set kiya gaya hai taaki hum ye pata laga sakein ki ye error operational hai (expected error) aur programming error nahi hai.
      this.isOperational = true;
  
      // Stack trace capture kiya gaya hai, jisme constructor call ko exclude kiya gaya hai, taki humein ye pata chale ki error kahan create hua.
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // Yeh class ko dusre files mein use karne ke liye export kiya gaya hai.
  module.exports = ErrorHandler;
  */


// --------------what happens in error  handling
  //In a route handler, if a condition is met (e.g., product not found), it creates a new instance of the ErrorHander class and passes it to the next function.
// 4. Middleware Execution:
// When an error occurs in the route handler, it reaches the error handling middleware due to the next(new ErrorHander(...)) call.
// The error handling middleware logs the error and sends a JSON response with the error details.