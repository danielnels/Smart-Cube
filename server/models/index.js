const User = require("./User");
const TokenEmailVerification = require("./TokenEmailVerification");
const DailyMeasurement = require("./Daily-measurement");
const HourlyMeasurement = require("./Hourly-measurement");
const MinutelyMeasurement= require("./Minutely-measurement");
const SecondlyMeasurement = require("./Secondly-measurement");
const Irrigation = require("./Irrigation");
const Preferences = require("./Preferences");
const WeatherData = require("./WeatherData");


module.exports = { 
User, 
TokenEmailVerification, 
DailyMeasurement,
HourlyMeasurement, 
MinutelyMeasurement,
SecondlyMeasurement,
Irrigation,
Preferences,
WeatherData };
