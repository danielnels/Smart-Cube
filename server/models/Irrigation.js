const { Schema, model } = require("mongoose");

const irrigationSchema = new Schema({
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


const Irrigation = model('Irrigation',irrigationSchema);

module.exports = Irrigation;