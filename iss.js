//Require Request module
const request = require("request");

//Function that will fetch my IP via ipify.org
const fetchMyIP = function (callback) {
  const url = "https://api.ipify.org?format=json";

  request(`${url}`, (error, response, body) => {
    //This handles an error
    if (error) {
      return callback(error, null);
    }

    //This handles if there is no IP value
    if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching IP: ${body}`,
          null
        )
      );
      return;
      //This handles if everything goes smooth
    } else {
      const data = JSON.parse(body);
      const myIP = data.ip;
      callback(null, myIP);
    }
  });
};

//Function that will fetch my longitude and latitude
const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    //Error handling 1
    if (error) {
      return callback(error, null);
    }
    //Error handling 2
    if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`
        ),
        null
      );
      return;
    }
    //If everything went smooth
    const data = JSON.parse(body);
    const { latitude, longitude } = data;
    callback(null, { latitude, longitude }); //{ latitude: 43.845, longitude: -79.322 }
  });
};

//Function that will give the times that ISS will fly over given coordinates
const fetchISSFlyOverTimes = function (coordinates, callback) {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coordinates.latitude}&lon=${coordinates.longitude}`,
    (error, response, body) => {
      //Error handling 1
      if (error) {
        return callback(error, null);
      }
      //Error handling 2
      if (response.statusCode !== 200) {
        callback(
          Error(
            `Status Code ${response.statusCode} when fetching times for ISS appeareaces for the given lat and long. Response: ${body}`
          ),
          null
        );
        return;
      }
      //If everything went smooth
      const data = JSON.parse(body);
      const responses = data.response;
      callback(null, responses);
    }
  );
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It did not work!", error);
      return;
    }
    // console.log("It worked! Returned IP:", ip);
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        console.log("It did not work!", error);
        return;
      }
      // console.log(`It worked! Here are your coordinates:`, coordinates);
      fetchISSFlyOverTimes(coordinates, (error, responses) => {
        if (error) {
          console.log("It did not work!", error);
          return;
        }
        // console.log(`It worked! Here are your coordinates:`, responses);
        callback(null, responses);
      });
    });
  });
};

// module.exports = { fetchMyIP };
// module.exports = { fetchCoordsByIP };
// module.exports = { fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };
