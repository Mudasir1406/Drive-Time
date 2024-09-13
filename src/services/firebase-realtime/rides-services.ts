import database from '@react-native-firebase/database';

export const getRides = () => {
  database()
    .ref('/drive-time')
    .on('value', snapshot => {
      console.log('User data: ', snapshot.val());
    });
};
