const { Schema, model } = require("mongoose");

const preferenceSchema = new Schema({
    minIrrigationIntervalInMinutes: {
        type: Number,
        require: true
    },
    daysInterval: {
        type: Number,
        require: true
    },
    startTime : {
        type: String,
        require: true
    },
    irrigationTimeInSeconds: {
        type: Number,
        require: true
    },
    capacityBuffer: {
        type: Number,
        require: true
    },
    sensorName: {
        type: String,
        require: true
    },
    signalPin: {
        type: Number,
        required: true
    }
})


const Preference = model('Preferences',preferenceSchema);

module.exports = Preference;