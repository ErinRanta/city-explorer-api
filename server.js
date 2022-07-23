'use strict';
 
require('dotenv').config();
// require is a function built into Node, loads exported values into our current file.
const express = require('express'); // whats happening at this point.
const cors = require('cors');
const weatherData = require ('./data/weather.json');
const server = express();
server.use(cors());
 
 
 
 
const PORT = process.env.PORT;
 
 
class Forecast {
 constructor(obj) {
   this.date = obj.dateime;
   this.condition = condition;
   this.description = 'low of ' + obj.low_temp + ', high of ' + obj.high_temp + ' with ' + obj.weather.description.toLowerCase();
 }
}
 
 
server.get('/', (request, response) => {
 response.send('hello!');
});
 
 
 
// create a weather route //
 
server.get('/weather', (request, response) => {
 console.log(request.query);
 let { lat, lon, searchQuery } = request.query;
 
 if (!lat || !lon || !searchQuery) {
   throw new Error('Please send lat lon and search query as a string');
 }
 
 
 
 // / find appropriate value from weatherData
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
 
function forecastArray(weatherCity) {
 const forecastArr = weatherCity.data.map(el => {
   let date = el.valid_date;
   let condition = el.weather.description;
   return new Forecast(date, condition);
 });
 return forecastArr;
}
 
 
 
//error section //
 
server.get('/error', (request, response) => {
 
 throw new Error('Error! Something is not working!');
 
});
 
server.use('*', (error, request, response, next) => {
 response.status(500).send(error);
});
 
server.use('*', (request, response) => {
 console.log('catch all route hit');
 response.status(404).send('Route Not found :(');
});
 
//server opens up to listen//
server.listen(PORT, () => {
 console.log('Server is running on port :: ' + PORT);
});
