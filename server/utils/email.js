const crypto = require("crypto");
// const nodemailer = require("nodemailer");
// const sendgridTransport = require("nodemailer-sendgrid-transport");
const TokenEmailVerification = require("../models/TokenEmailVerification");
require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: "danieln0014@gamil.com", // Change to your recipient
//   from: "danieln@newground.net.au", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

//create nodemailer transport with sendgrid api key
// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key: process.env.SENDGRID_API_KEY,
//     },
//   })
// );

module.exports = {
  // generate a token for email verification
  generateToken: function (userId) {
    return new TokenEmailVerification({
      _userId: userId,
      token: crypto.randomBytes(16).toString("hex"),
    });
  },
  //create options object for email verification
  generateVerificationEmailOptions: function (username, email, token, userId) {
    let slash = "";
    if (process.env.NODE_ENV !== "production") {
      slash = "/";
    }
    return {
      from: "danieln@newground.net.au",
      to: email,
      subject: "Smart-Cube - Account Verification Link",
      text:
        "Hello " +
        username +
        ",\n\n" +
        "Please verify your account by clicking the link: \n" +
        process.env.APP_DOMAIN +
        slash +
        "verify?email=" +
        email +
        "&token=" +
        token.token +
        "&id=" +
        userId +
        "\n\nThank You!\n",
    };
  },
  //create options object for password reset email
  generatePasswordResetEmailOptions: function (username, email, newPw) {
    return {
      from: "danieln@newground.net.au",
      to: email,
      subject: "Smart-cube - Reset Password",
      text:
        "Hello " +
        username +
        ",\n\n" +
        "Your password has been changed to: " +
        newPw +
        "\n\n" +
        "Click here to login: \n" +
        process.env.APP_DOMAIN +
        "/login" +
        "\n\nThank You!\n",
    };
  },

  //send email with options provided
  sendEmail: function (emailOptions) {
    return sgMail.sendMail(emailOptions);
  },
  //generate a random password
  //https://stackoverflow.com/questions/1497481/javascript-password-generator
  generatePassword: function (len) {
    let length = len ? len : 10;
    let string = "abcdefghijklmnopqrstuvwxyz"; //to upper
    let numeric = "0123456789";
    let punctuation = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    let character = "";

    while (password.length < length) {
      entity1 = Math.ceil(string.length * Math.random() * Math.random());
      entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
      entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
      hold = string.charAt(entity1);
      hold = password.length % 2 == 0 ? hold.toUpperCase() : hold;
      character += hold;
      character += numeric.charAt(entity2);
      character += punctuation.charAt(entity3);
      password = character;
    }
    password = password
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("");
    return password.substr(0, len);
  },
};
