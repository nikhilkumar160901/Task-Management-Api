const nodemailer = require('nodemailer');
const config = require('../config/email');


const transport = nodemailer.createTransport(config.email.smtp);

const sendEmail = async (to, subject, html) => {
    const msg = { from: `"Task-Management" <${config.email.from}>`, to, subject, html };
    console.log("Email sent successfully ");
    await transport.sendMail(msg);
};


const sendRegistration = async (to) => {
    let email = to;
    let subject = "Registration Successful"
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Welcome to Task Management System!</h2>
            <p>Dear User,</p>
            <p>Congratulations! You have successfully registered on our Task Management System. Your account is now active.</p>
            <p>We are excited to have you on board. Here are some features you can explore:</p>
            <ul>
                <li>Manage your tasks efficiently</li>
                <li>Collaborate with your team</li>
                <li>Track your progress</li>
            </ul>
            <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
            <p>Best regards,<br>The Task Management System Team</p>
            <hr>
            <p style="font-size: 0.9em; color: #555;">
                If you did not register for this account, please ignore this email.
            </p>
        </div>
    `;
    await sendEmail(email, subject, html);
  }
  




module.exports = {
    sendEmail,
    sendRegistration
  };
  