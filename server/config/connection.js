const mongoose = require("mongoose");
require("dotenv").config();

//get mongoose connection to mongodb locally or via provided URI
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/" + process.env.DB_NAME,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    }
);

// module.exports = mongoose.connection;
// const mongoose = require('mongoose');

// mongoose.connect(
//   process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/react-router-activity',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// module.exports = mongoose.connection;
