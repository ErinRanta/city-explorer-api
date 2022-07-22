'use strict';

require('dotenv').config();
// require is a function built into Node, loads exported values into our current file.
const express = require('express'); // whats happening at this point.
const cors = require('cors');
const weatherData = require ('./data/weather.json');
const server = express();
 server.use(cors);

const PORT = process.env.PORT;







class Forecast {
  constructor(obj) {
    this.date = obj.dateime;
    this.condition = condition;
  }
}


const app = express();
app.use(cors()); // set up cross origin resource sharing

// create a weather route (request?)

server.get('/weather', (request, response) => {
  console.log(request.query);

  let cityName = request.query.cityName.toLowerCase();
  let weatherCity = weather.find(el => {
    return cityName === el.city_name.toLowerCase();
  });

  // find appropriate value from weatherData
  // use search Query to find an object within weather data
  let city = weatherCity.find(city => {
    return city.city_name.toLowerCase() === searchQuery.toLowerCase();
  });

  if (city) {
    // create forecast objects for each forcast in city.data
    let forecastArray = city.data.map(forecast => new Forecast(forecast));
    response.send(forecastArray);
  } else {
    response.status(404).send('City not found');
  }
});

// error handling??
server.use('*', (error, request, response, next) => {
  // next is a function that moves the request to the next middleware
  response.status(500).send(error);
});

server.use('*', (request, response) => {
  response.status(404).send('Route not found');
});

server.listen(PORT, () => {
  console.log('Server is running on port : ' + PORT);
});