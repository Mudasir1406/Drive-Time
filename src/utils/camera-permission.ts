import {Platform} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const requestCameraPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Living will Camera Permission',
          message:
            'Living will needs access to your camera ' +
            'so you can take pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else if (Platform.OS === 'ios') {
      const permissionStatus = await request(PERMISSIONS.IOS.CAMERA);
      return permissionStatus === RESULTS.GRANTED;
    } else {
      return false; // Unsupported platform
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Drive Time Location Permission',
          message:
            'Drive Time needs access to your location ' +
            'to provide relevant information.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else if (Platform.OS === 'ios') {
      return requestLocationAuthorization();
    } else {
      return false; // Unsupported platform
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const requestLocationAuthorization = async () => {
  let result = false;
  Geolocation.requestAuthorization(
    () => {
      result = true;
      // Success callback: Location permission granted
      console.log('Location permission granted.');
    },
    error => {
      result = false;
      // Error callback: Handle permission errors here
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log('Permission denied. Message: ', error.message);
          break;
        case error.POSITION_UNAVAILABLE:
          console.log('Position unavailable. Message: ', error.message);
          break;
        case error.TIMEOUT:
          console.log('Request timeout. Message: ', error.message);
          break;
        default:
          console.log('Unknown error: ', error.message);
      }
    },
  );
  return result;
};

export const configureGeolocation = () => {
  Geolocation.setRNConfiguration({
    skipPermissionRequests: false, // You can set to true if handling permissions manually
    authorizationLevel: 'whenInUse', // Options: 'always', 'whenInUse', 'auto'
    enableBackgroundLocationUpdates: false, // Set to true if you need background location updates (iOS-only)
    locationProvider: 'auto', // Options: 'playServices', 'android', 'auto' (Android-only)
  });
};
