const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.SECRET_EMAIL_DIRECTION,
        pass: process.env.ULTRA_SECRET_EMAIL_PASS
    }
});

module.exports = transporter;