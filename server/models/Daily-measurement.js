const { Schema, model } = require("mongoose");

const dailyMeasurementSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now,
        require: true
    },
    capacity: {
        type: Number,
        require: true
    },
    sensorName: {
        type: String,
        require: true
    }
})


const DailyMeasurement = model('Daily-measurement',dailyMeasurementSchema);

module.exports = DailyMeasurement;


