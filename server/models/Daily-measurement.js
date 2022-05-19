const { Schema, model } = require("mongoose");

const moistureMeasurementSchema = new Schema({
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


const MoistureMeasurement = model('Moisture-measurement',moistureMeasurementSchema);

module.exports = MoistureMeasurement;


