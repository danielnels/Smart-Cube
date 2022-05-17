const User = require("./User");
const TokenEmailVerification = require("./TokenEmailVerification");
const DailyMeasurement = require("./Daily-measurement");
const HourlyMeasurement = require("./Hourly-measurement");
const MinutelyMeasurement= require("./Minutely-measurement");
const SecondlyMeasurement = require("./Secondly-measurement");
const Irrigation = require("./Irrigation");
const Device = require("./Device");



module.exports = { 
User, 
TokenEmailVerification, 
DailyMeasurement,
HourlyMeasurement, 
MinutelyMeasurement,
SecondlyMeasurement,
Irrigation,
Device
};
