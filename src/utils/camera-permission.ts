import {Platform} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

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
      const permissionStatus = await Geolocation.requestAuthorization(
        'whenInUse',
      );
      console.log(permissionStatus);
      return permissionStatus === RESULTS.GRANTED;
    } else {
      return false; // Unsupported platform
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
