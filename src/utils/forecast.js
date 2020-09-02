const request = require("request");

const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=851a10747daf53cc0aa3bc6e224de365&query=${lat},${long}&units=f`;

  request({ url, json: true }, (error, response) => {
    const res = response.body;
    if (error) {
      callback("Unable to connect to weather server!", undefined);
    } else if (res.error) {
      callback("Unable to connect to location", undefined);
    } else {
      callback(
        undefined,
        `${res.current.weather_descriptions[0]}: It is currently ${res.current.temperature} degrees out. It feels like ${res.current.feelslike} degrees out. Humidity: ${res.current.humidity} and UV-Index: ${res.current.uv_index}`
      );
    }
  });
};

module.exports = forecast;
