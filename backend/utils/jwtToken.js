
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