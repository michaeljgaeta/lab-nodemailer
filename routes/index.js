'use strict';

const { Router } = require('express');
const router = new Router();

//require packages
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

//setup transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL, //dotenv
    pass: process.env.NODEMAILER_PASSWORD //dotenv
  }
});

router.get('/', (req, res, next) => {
  console.log(req.user);
  res.render('index', { title: 'Hello World!' });
});

router.get('/private', (req, res, next) => {
  res.render('private');
});

//send an email with a promise sequence
transporter
  .sendMail({
    from: `LAB TEST <${process.env.NODEMAILER_EMAIL}>`,
    to: "ih174test@gmail.com",
    subject: "Test",
    //send the user to an endpoint specific to verification requests
    html: "<strong>Welcome to the app!</strong><br><a href="http/localhost:3000/auth/confirm/:confirmationCode/">Verify Email</a>"
  })
  .then((result) => {
    console.log("email sent successfuly");
    console.log(result);
  })
  .catch((error) => {
    console.log("There was an error sending the email.");
    console.log(error);
  });

module.exports = router;
