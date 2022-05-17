const { Schema, model } = require("mongoose");

const minutelyMeasurementSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now,
        expires: 3600,
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


const MinutelyMeasurement = model('Minutely_measurement',minutelyMeasurementSchema);

module.exports = MinutelyMeasurement;