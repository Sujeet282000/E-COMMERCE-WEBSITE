const nodemailer = require("nodemailer");

// Define a function to send an email using Nodemailer
const sendEmail = async (options) => {

    // Create the transporter object with the required configuration for sending emails through Gmail SMTP server.
    // Create a Nodemailer transporter with the specified configuration

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,                 // SMTP server hostname
        port: process.env.SMTP_PORT,                 // Port for the SMTP server
        service: process.env.SMTP_SERVICE,           // Service name (e.g., 'gmail' or 'yahoo')
        secure: false,                               // For non-secure connections (Set to true for secure connections)
        auth: {
            user: process.env.SMTP_MAIL,             // Your email address
            pass: process.env.APP_PASSWORD,          // Use the generated App Password instead of the regular password
        },
    });


    // Define the email options (sender, recipient, subject, and message body)
    
    const mailOptions = {
        from: process.env.SMTP_MAIL,            // Sender's email address
        to: options.email,                      // Recipient's email address
        subject: options.subject,               // Email subject
        text: options.message,                  // Email message (text format)
    };

    // Use the transporter to send the email with the specified options
    await transporter.sendMail(mailOptions);
}

// Export the sendEmail function to make it available for use in other files
module.exports = sendEmail;
