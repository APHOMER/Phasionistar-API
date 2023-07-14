const nodemailer = require('nodemailer');

const sendMail = async (option) => {
    // CREATE TRANSPORTER
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    // DEFINE EMAIL OPTIONS
    const emailOptions = {
        from: `Phasionistar support<support@phasionistar.com>`,
        to: option.email,
        subject: option.subject,
        text: option.message
    }

    await transporter.sendMail(emailOptions);
}



module.exports = sendMail;