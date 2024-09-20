import database from '@react-native-firebase/database';
import {MyObjectType} from '../../types/types';
import {UserSliceType} from '../../redux/user/slice';

interface GetRidesResult {
  filteredRides: MyObjectType[];
}
export const getRides = (): Promise<GetRidesResult> => {
  return new Promise((resolve, reject) => {
    database()
      .ref('/drive-time/rides')
      .on(
        'value',
        snapshot => {
          const allRides = snapshot.val(); // Retrieve all the ride data

          if (allRides) {
            // Create a temporary variable to store filtered rides
            const filteredRides = Object.keys(allRides)
              .map(key => allRides[key]) // Convert the object into an array of rides
              .filter(ride => ride.status === 'Offer'); // Filter rides with status 'Offer'

            // Resolve the promise with both allRides and filteredRides
            resolve({filteredRides});
          } else {
            console.log('No rides found.');
            resolve({filteredRides: []});
          }
        },
        error => {
          reject(error);
        },
      );
  });
};

interface UpdateAndPushResult {
  updated: boolean;
  data: MyObjectType;
}

export const updateAndPushData = async (
  userID: string,
  status: string,
  doc: MyObjectType,
  driverInfo: UserSliceType,
  currentLat: number,
  currentLong: number,
): Promise<UpdateAndPushResult> => {
  try {
    const rideRef = database().ref(`/drive-time/rides/${userID}`);

    // Create the update payload
    const updates = {
      status: status,
    };

    // Update the data first
    await rideRef.update(updates);
    console.log('Data updated successfully.');

    // Now push additional data to the same reference
    const newData = {
      driverInfo: {
        ...driverInfo,
        currentLat: currentLat,
        currentLong: currentLong,
      },
    };

    await rideRef.update(newData);

    // Fetch the updated data
    const snapshot = await rideRef.once('value');
    const updatedData = snapshot.val();

    return {updated: true, data: updatedData};
  } catch (error) {
    console.error('Error updating or pushing data:', error);
    throw error; // Reject the promise with the error
  }
};
interface UpdateLatLongResult {
  updated: boolean;
  data: MyObjectType;
}
export const updateDriverLocation = async (
  userID: string,
  currentLat: number,
  currentLong: number,
): Promise<UpdateLatLongResult> => {
  try {
    const rideRef = database().ref(`/drive-time/rides/${userID}/driverInfo`);

    // Create the update payload for latitude and longitude
    const updates = {
      currentLat: currentLat,
      currentLong: currentLong,
    };

    // Update the latitude and longitude inside driverInfo
    await rideRef.update(updates);
    console.log('Driver location updated successfully.');

    // Fetch the updated document
    const rideDocRef = database().ref(`/drive-time/rides/${userID}`);
    const snapshot = await rideDocRef.once('value');
    const updatedDoc = snapshot.val();

    return {updated: true, data: updatedDoc}; // Return the updated document
  } catch (error) {
    console.error('Error updating driver location:', error);
    throw error; // Reject the promise with the error
  }
};
