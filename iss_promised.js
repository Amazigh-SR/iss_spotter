const request = require("request-promise-native");

//Defining the fetchMyIP function

const fetchMyIP = function() {
  const url = "https://api.ipify.org?format=json";
  return request(url);
};

const fetchCoordsByIP = function(body) {
  const url = "https://freegeoip.app/json/";
  const ip = JSON.parse(body).ip;
  return request(`${url}${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const { response } = JSON.parse(body);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
