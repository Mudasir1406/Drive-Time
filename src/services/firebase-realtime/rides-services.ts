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
}

export const updateAndPushData = (
  userID: string,
  status: string,
  doc: MyObjectType,
  driverInfo: UserSliceType,
  currentLat: number,
  currentLong: number,
): Promise<UpdateAndPushResult> => {
  return new Promise((resolve, reject) => {
    const rideRef = database().ref(`/drive-time/rides/${userID}`);

    // Create the update payload
    const updates = {
      status: status,
    };

    // Update the data first
    rideRef
      .update(updates)
      .then(() => {
        console.log('Data updated successfully.');

        // Now push additional data to the same reference
        const newData = {
          driverInfo: {
            ...driverInfo,
            currentLat: currentLat,
            currentLong: currentLong,
          },
        };

        return rideRef.update(newData).then(() => {
          resolve({updated: true});
        });
      })
      .catch(error => {
        console.error('Error updating or pushing data:', error);
        reject(error);
      });
  });
};
interface UpdateLatLongResult {
  updated: boolean;
}
export const updateDriverLocation = (
  userID: string,
  currentLat: number,
  currentLong: number,
): Promise<UpdateLatLongResult> => {
  return new Promise((resolve, reject) => {
    const rideRef = database().ref(`/drive-time/rides/${userID}/driverInfo`);

    // Create the update payload for latitude and longitude
    const updates = {
      currentLat: currentLat,
      currentLong: currentLong,
    };

    // Update the latitude and longitude inside driverInfo
    rideRef
      .update(updates)
      .then(() => {
        console.log('Driver location updated successfully.');
        resolve({updated: true});
      })
      .catch(error => {
        console.error('Error updating driver location:', error);
        reject(error);
      });
  });
};
