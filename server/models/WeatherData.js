const { Schema, model } = require('mongoose')

const WeatherDataSchema = new Schema(
  {
  Name: {
    type: String,
    require: true
},
locationKey: {
        type: Number,
        require: true
    },
    cityName: {
      type: String,
      require: true
  },
  countryName: {
    type: String,
    require: true
},
    dailyWeather: {
        type: Object,
        require: true
    },
    fiveDaysWeather: {
      type: Object,
      require: true
  }
})
  

  
const WeatherData = model('WeatherData',WeatherDataSchema);

module.exports = WeatherData;
  
  
  
  
  
  
  


