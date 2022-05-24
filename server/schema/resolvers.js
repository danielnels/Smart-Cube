const bcrypt = require("bcrypt");
const { AuthenticationError } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");

const { User, TokenEmailVerification } = require("../models");
const { signToken } = require("../utils/auth");

const {
  generateToken,
  generateVerificationEmailOptions,
  generatePasswordResetEmailOptions,
  sendEmail,
  generatePassword,
} = require("../utils/email");

const { getGraphQLRateLimiter } = require("graphql-rate-limit");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const rateLimiter = getGraphQLRateLimiter({ identifyContext: (ctx) => ctx.id });

const resolvers = {
  Date: dateScalar,
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      //check if user with the credentials provided already exists
      const userCheck = await User.findOne({
        $or: [{ email }, { username }],
      });
      //if so let user know
      if (userCheck) {
        throw new AuthenticationError(
          "An account with that email or username already exists. Please try again."
        );
      } else {
        //otherwise create the new user, and a sign in token and return it
        const user = await User.create({
          username,
          email,
          password,
        });
        const token = signToken(user);
        return { token, user };
      }
    },

    addEmailVerificationToken: async (
      parent,
      { userId, username, email },
      context,
      info
    ) => {
      let args = { userId, username, email };
      //prevent users from doing this too frequently
      const errorMessage = await rateLimiter(
        { parent, args, context, info },
        {
          max: 2,
          window: "20s",
          message: "You are doing that too often.",
        }
      );
      if (errorMessage) throw new AuthenticationError(errorMessage);
      //create a email verification token and associated user id
      const newUserEmailToken = generateToken(userId);
      //save it to mongodb
      try {
        newUserEmailToken.save();
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
      // generate options for verification email
      const emailOptions = generateVerificationEmailOptions(
        username,
        email,
        newUserEmailToken,
        userId
      );
      //send email with options
      try {
        sendEmail(emailOptions);
        console.log("addEmailVerificationToken email sent");
      } catch (error) {
        console.log(error);
        throw new AuthenticationError(
          "Failed to send email. Try again later!!\n\n" + error
        );
      }
    },
    verifyEmail: async (parent, { email, token }) => {
      //find the token associated with the email verification
      const tokenReturned = await TokenEmailVerification.findOne({
        token: token,
        expireAt: { $gt: new Date(Date.now() - 86400000) },
      });
      //if the token doesn't exist or has expired let user know
      if (!tokenReturned) {
        throw new AuthenticationError(
          "This token doesn't exist or has expired."
        );
      }
      //get the associated user
      const userReturned = await User.findOne({
        token: token,
        email: email,
      });
      //if the user doesn't exist let user know
      if (!userReturned) {
        throw new AuthenticationError(
          "There is no user associated with that token."
        );
      }
      //if both exist, verify email in mongodb
      userReturned.isVerified = true;
      let updatedUser = await userReturned.save();
      if (!updatedUser) {
        throw new AuthenticationError(
          "There was an error verifying this email address."
        );
      }
      return { user: userReturned };
    },
    login: async (parent, { email, password }) => {
      //find user based on provided email
      const user = await User.findOne({ email });
      //if it doesn't exist, let the user know in a generic message to prevent giving too much info to malicious actors
      if (!user) {
        throw new AuthenticationError(
          "If the user you entered exists, you entered the wrong username and/or password."
        );
      }
      //check if password for found user is correct
      const correctPw = await user.isCorrectPassword(password);
      //if not let user know
      if (!correctPw) {
        throw new AuthenticationError(
          "If the user you entered exists, you entered the wrong username and/or password."
        );
      }
      console.log(user);
      //if both are found create a sign in token and pass it and the user data back to client
      const token = signToken(user);
      return { token, user };
    },
    forgotPassword: async (parent, { email }, context, info) => {
      let args = { email };
      const errorMessage = await rateLimiter(
        { parent, args, context, info },
        {
          max: 1,
          window: "10s",
          message: "You are doing that too often.",
        }
      );
      if (errorMessage) throw new AuthenticationError(errorMessage);
      //generate a 10 character random password
      let newPw = generatePassword(10);
      //encrypt the new password for the database
      let encryptedPw = bcrypt.hashSync(newPw, 10);
      //find the user and update their passwords
      const user = await User.findOneAndUpdate(
        { email },
        { password: encryptedPw }
      );
      //if the user doesn't exist let user know
      if (!user) {
        throw new AuthenticationError(
          "If the email you entered exists, you will be sent an email with a new password."
        );
      }
      //create email options for forgot password
      const emailOptions = generatePasswordResetEmailOptions(
        user.username,
        user.email,
        newPw
      );
      //send email with new password to user
      try {
        sendEmail(emailOptions);
        console.log("forgotPassword email sent");
      } catch (error) {
        console.log(error);
        throw new AuthenticationError(
          "Failed to send email. Try again later. " + error
        );
      }
      return user;
    },
    updatePassword: async (
      parent,
      { email, oldPassword, newPassword },
      context
    ) => {
      //context (set in app.js on the client) shows there is a valid token associated with the user for security
      //checking the context has a user is server side validation that the login is valid, and should be used on all actions that require the user to be logged in
      if (context.user) {
        //find user by email
        const user = await User.findOne({ email });
        //if it doesn't exist let the user know (unlikely in this scenario)
        if (!user) {
          throw new AuthenticationError(
            "The email does not have a record associated with it."
          );
        }
        //if the user exists confirm the existing password entered is correct
        const correctPw = await user.isCorrectPassword(oldPassword);
        //if not let user know
        if (!correctPw) {
          throw new AuthenticationError(
            "The existing password you entered is incorrect."
          );
        }
        //the existing password is correct, so take the new one and encrypt it
        let encryptedPw = bcrypt.hashSync(newPassword, 10);
        //update database with new encrypted password
        const userUpdated = await User.findOneAndUpdate(
          { email },
          { password: encryptedPw }
        );
        //if no data was returned there was an error updating the password
        if (!userUpdated) {
          throw new AuthenticationError(
            "There was a problem updating your password."
          );
        }
        return userUpdated;
      }
      throw new AuthenticationError(
        "You must be logged in to perform this action."
      );
    },

    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
  },
};

module.exports = resolvers;
