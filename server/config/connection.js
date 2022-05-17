const mongoose = require("mongoose");
require("dotenv").config();

//get mongoose connection to mongodb locally or via provided URI
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/" + process.env.DB_NAME,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    }
);

module.exports = mongoose.connection;
