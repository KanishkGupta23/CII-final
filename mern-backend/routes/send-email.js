const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Define your email sending function
const sendEmail = async (to, action, applicationId) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: process.env.EMAILJS_USER_ID,
      pass: process.env.EMAILJS_USER_SECRET,
    },
  });

  const mailOptions = {
    from: process.env.EMAILJS_USER_ID,
    to,
    subject: `Application Status: ${action}`,
    text: `Your application with ID ${applicationId} has been marked as: ${action}.`,
  };

  return transporter.sendMail(mailOptions);
};

// Route to handle sending emails
router.post('/send-email', async (req, res) => {
  const { email, action, applicationId } = req.body;

  if (!email || !action || !applicationId) {
    return res.status(400).send('Missing required fields');
  }

  try {
    await sendEmail(email, action, applicationId);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send('Error sending email');
  }
});

module.exports = router;
