const mongoose = require("mongoose");
const {
    User,
    TokenEmailVerification,
   
} = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();

//get mongoose connection object
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/' + process.env.DB_NAME,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
    }
);

//sync index on startup to ensure token expirations happen
const syncIndexes = async () => {
    await TokenEmailVerification.syncIndexes();
    await User.syncIndexes();
};
syncIndexes();

//hash password function for seed passwords
const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};


//data object to be inserted in to db
const userSeed = 
    {
        username: "Daniel",
        email: "danieln0014@gmail.com",
        password: hashPassword("12345"),
        isVerified: false,
   
    }
   
setTimeout(function () {
    User.deleteMany({})
        .then(() => User.insertMany(userSeed))
        .then((data) => {
            console.log(
                data.length +
                    " " +
                    Object.keys({ userSeed })[0] +
                    " records inserted."
            );
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}, 3000);