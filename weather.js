'use strict';

require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();
const cors = require('cors');

const weatherAPIKey = process.env.REACT_APP_WEATHERBIT_API_KEY;
app.use(cors());

class Forecast {
  constructor(date, condition, high, low) {
    this.date = date;
    this.condition = condition;
    this.high = high;
    this.low = low;
  }
}

const getWeather = (lat, lon, response) => {

  
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherAPIKey}&lat=${lat}&lon=${lon}&units=I`;

  axios.get(url)

    .then(weatherGet => {
      let forecastArr = makeForecastArray(weatherGet.data.data);
      console.log('weather.js .then forecastArr[0]', forecastArr[0]);
      response.send(forecastArr);
    })
    .catch((e) => {
      console.log('error', e);
      response.status(500).send(e);
    });
};

const makeForecastArray = (arr) => {
  console.log('makeForecastArray arr[0]',arr[0]);
  const forecastArr = arr.map(el => {
    let date = el.valid_date;
    let condition = el.weather.description;
    let high = el.high_temp;
    let low = el.low_temp;
    return new Forecast(date, condition, high, low);
  });
  console.log('makeForecastArr forecastArr[0]',forecastArr[0]);
  return forecastArr;
};

module.exports = getWeather;