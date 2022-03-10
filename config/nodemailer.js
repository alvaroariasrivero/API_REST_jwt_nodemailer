const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'workshopnodemailerjwt@gmail.com',
        pass: process.env.ULTRA_SECRET_EMAIL_PASS
    }
});

module.exports = transporter;