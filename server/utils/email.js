const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const TokenEmailVerification = require("../models/TokenEmailVerification");
require("dotenv").config();
//create nodemailer transport with sendgrid api key
const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: process.env.SENDGRID_API_KEY,
        },
    })
);

module.exports = {
    // generate a token for email verification
    generateToken: function (userId) {
        return new TokenEmailVerification({
            _userId: userId,
            token: crypto.randomBytes(16).toString("hex"),
        });
    },
    //create options object for email verification
    generateVerificationEmailOptions: function (
        username,
        email,
        token,
        userId
    ) {
       
        let slash = "";
        if (process.env.NODE_ENV !== "production") {
            slash = "/";
        }
        return {
            from: "no-reply@smart-cube.io",
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
            from: "no-reply@smart-cube.io",
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
        return transporter.sendMail(emailOptions);
    },
    //generate a random password
    //https://stackoverflow.com/questions/1497481/javascript-password-generator
    generatePassword: function (len) {
        var length = len ? len : 10;
        var string = "abcdefghijklmnopqrstuvwxyz"; //to upper
        var numeric = "0123456789";
        var punctuation = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
        var password = "";
        var character = "";
        var crunch = true;
        while (password.length < length) {
            entity1 = Math.ceil(string.length * Math.random() * Math.random());
            entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
            entity3 = Math.ceil(
                punctuation.length * Math.random() * Math.random()
            );
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
