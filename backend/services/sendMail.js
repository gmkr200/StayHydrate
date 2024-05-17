const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
})

const sendMail = async (email, mailSubject, content) => {
    try {

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: mailSubject,
            html: content
        }

        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);

    } catch (error) {
        console.log(error);
    }
}

module.exports = sendMail