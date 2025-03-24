//Sends emails (e.g., for password reset, or to register a user)

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or another like Mailgun, SendGrid, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = (to, token) => {
  const confirmURL = `http://localhost:3000/confirm-email?token=${token}`;

  return transporter.sendMail({
    from: `"BookWorm" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Confirm your email 📬',
    html: `
      <h2>Welcome to BookWorm!</h2>
      <p>Click the link below to confirm your email and activate your account:</p>
      <a href="${confirmURL}">${confirmURL}</a>
      <p>If you didn’t create this account, you can safely ignore this email.</p>
    `,
  });
};

module.exports = {
  sendConfirmationEmail,
};
