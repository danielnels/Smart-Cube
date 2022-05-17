const { Schema, model } = require("mongoose");

const secondlyMeasurementSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now,
        expires: 60,
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

const SecondlyMeasurement = model('Secondly_measurement',secondlyMeasurementSchema);

module.exports = SecondlyMeasurement;





