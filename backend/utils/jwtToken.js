
// *************
// Create token and saving in cookie


// Ye teen  chize user, statusCode, res ham jaha ye function call karega waha par denge

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    //----- options for cookie // agar hame cookie me bhejna he to usme kuch options hote he to ham ek option varaible bana lenge
    const options = {
        // Hamari cookie kitni time me expire hogi 
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPI * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    // ---------

    res.status(statusCode).cookie('token',token, options).json({
        success: true,
        user: user,
        token: token,
    });

}

module.exports = sendToken;













// ************more Readable***********
/*

// *************
// Create token and save it in a cookie

// This function takes three parameters: user object, HTTP status code, and the response object
const sendToken = (user, statusCode, res) => {
    // Generate a JSON Web Token (JWT) for the user
    const token = user.getJWTToken();

    //----- options for the cookie // if we want to send the token in a cookie, we define some options for the cookie
    const options = {
        // Set the expiration time for the cookie
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPI * 24 * 60 * 60 * 1000
        ),
        // Make the cookie accessible only through HTTP (not JavaScript)
        httpOnly: true,
    };
    // ---------

    // Set the HTTP status code, attach the token to a cookie, and send a JSON response
    res.status(statusCode)
        .cookie('token', token, options) // Attach the 'token' cookie with the generated token
        .json({
            success: true,
            user: user,
            token: token,
        });
}

// Export the sendToken function to make it accessible in other files
module.exports = sendToken;
*/