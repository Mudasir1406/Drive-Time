import axios from 'axios';

// Function to get location name from latitude and longitude
export const getLocationName = async (latitude: number, longitude: number) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCMj4kAhPPoWAT32gMersFx7FkvMEW3560`;

  try {
    const response = await axios.get(url);
    const results = response.data.results;

    if (results.length > 0) {
      const locationName = results[0].formatted_address;
      return locationName;
    } else {
      return 'Location not found';
    }
  } catch (error) {
    console.error('Error fetching location name:', error);
    return 'Error fetching location';
  }
};
