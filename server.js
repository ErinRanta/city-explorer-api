'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');
const server = express(); 
const PORT = process.env.PORT;
server.use(cors());

class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.description = 'low of ' + obj.low_temp + ', high of ' + obj.high_temp + ' with ' + obj.weather.description.toLowerCase();
  }
}

server.use(cors()); // cross origin resource sharing

// create a weather route
server.get('/weather', (request, response) => {
  console.log(request.query);
  let { lat, lon, searchQuery } = request.query;

  if (!lat || !lon || !searchQuery) {
    throw new Error('Please send lat lon and search query as a query string');
  }

  // find appropriate value from weatherData
  // use search Query to find an object within weather data


  let city = weatherData.find(city => {
    return city.city_name.toLowerCase() === searchQuery.toLowerCase();
  });

  if (city) {
    let forecastArray = city.data.map(forecast => new Forecast(forecast));
    response.send(forecastArray);
  } else {
    response.status(404).send('City not found');
  }
});

// error handling//

server.use('*', (error, request, response, next) => {
  response.status(500).send(error);
});

server.use('*', (request, response) => {
  response.status(404).send('Route not found');
});

//server opens up to  listen//

server.listen(PORT, () => {
  console.log('Server is running on port : ' + PORT);
});