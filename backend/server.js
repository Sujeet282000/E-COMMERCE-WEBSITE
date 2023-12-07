const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

// /------------/handling Uncaught Exception
process.on('uncaughtException', (err) => {
    console.log(`Error:, ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    // Perform any necessary cleanup or logging here
    process.exit(1); // Exit the process with a non-zero status code
  });

// --// config
dotenv.config({ path: "backend/config/config.env" });

// -----// connecting to the database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`)
});

// console.log(youtaube);youtube ids not defined to hamara crash ho gya server or we handled this error in upper 


// -------//unhandled promis rejection    //event - unhandleRejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    //now ab hame server ko close karna he 
    // Close the server
    server.close(async () => {
        console.log("Server closed.");

        // // Close the database connection
        // await mongoose.connection.close();
        // console.log("MongoDB connection closed.");

        // Exit the process
        process.exit(0);

    });
});