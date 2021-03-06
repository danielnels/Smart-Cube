const mongoose = require("mongoose");
require("dotenv").config();
//get mongoose connection to mongodb locally or via provided URI
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/smartcube_db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
