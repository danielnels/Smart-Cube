const jwt = require("jsonwebtoken");

// set token secret and expiration date
const secret = process.env.AUTH_SECRET;
const expiration = process.env.AUTH_EXPIRATION;

module.exports = {
    // token validation middleware for user security
    authMiddleware: function ({ req }) {
        //get the token
        let token =
            req.body.token || req.query.token || req.headers.authorization;
        if (req.headers.authorization) {
            token = token.split(" ").pop().trim();
        }
        //if empty return existing request
        if (!token) {
            return req;
        }
        //verify token is real and add related user data to request
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log("Invalid token");
        }
        //return updated request
        return req;
    },
    signToken: function ({ username, email, _id, isVerified,  }) {
        //create object with user data
        const payload = { username, email, _id, isVerified,  };
        //sign token with this data included
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};
