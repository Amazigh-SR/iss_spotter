// const { fetchMyIP } = require("./iss");
// const { fetchCoordsByIP } = require("./iss");
// const { fetchISSFlyOverTimes } = require("./iss");
const { nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It did not work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP("99.244.114.62", (error, coordinates) => {
//   if (error) {
//     console.log("It did not work!", error);
//     return;
//   }
//   console.log(`It worked! Here are your coordinates:`, coordinates);
// });

// fetchISSFlyOverTimes(
//   { latitude: 43.845, longitude: -79.322 },
//   (error, responses) => {
//     if (error) {
//       console.log("It did not work!", error);
//       return;
//     }
//     console.log(`It worked! Here are your coordinates:`, responses);
//   }
// );

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  // console.log(passTimes);
  printPassTimes(passTimes);
});
