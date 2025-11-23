const NodeGeocoder = require('node-geocoder');

// Configuration options
const options = {
  provider: 'openstreetmap',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  formatter: null       // 'gpx', 'string', ...
};

// Create a geocoder instance
const geocoder = NodeGeocoder(options);

// Function to get location name from latitude and longitude
async function getLocationName(lat, lon) {
  try {
    const res = await geocoder.reverse({ lat: lat, lon: lon });
    console.log(res);
    if (res && res.length > 0) {
      return res[0].formattedAddress;
    } else {
      return 'Location not found';
    }
  } catch (error) {
    console.error(error);
    return 'Error occurred';
  }
}

// // Example usage
// const latitude = 40.748817;
// const longitude = -73.985428;

// getLocationName(latitude, longitude).then(locationName => {
//   console.log('Location Name:', locationName);
// });
module.exports = {
    getLocationName,
}