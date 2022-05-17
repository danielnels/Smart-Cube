const { Schema, model } = require("mongoose");

const hourlyMeasurementSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now,
        expires: 604800,
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


const HourlyMeasurement = model('Hourly_measurement',hourlyMeasurementSchema);

module.exports = HourlyMeasurement;