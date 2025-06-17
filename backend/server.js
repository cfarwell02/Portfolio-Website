
require ('dotenv').config(); // Load variables from .env first

const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Save to file
  const entry = `Name: ${name}, Email: ${email}, Message: ${message}\n`;
  fs.appendFile('contact-submissions.txt', entry, (err) => {
    if (err) {
        console.error('File write error:', err);
    }
  });

  // Send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // not your regular Gmail password
    },
  });

  const mailOptions = {
    from: email,
    to: 'farwell.connor@gmail.com',
    subject: `New message from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).send('Submission saved, but email failed.');
    } else {
      console.log('Email sent:', info.response);
      return res.redirect('/thanks.html');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});