import {useToast} from 'react-native-toast-notifications';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {StoreDispatch} from '../redux/reduxStore';
import {userActions, UserSliceType} from '../redux/user/slice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DriverStackParamList, MyObjectType} from '../types/types';

export const useUser = () => {
  const navigation = useNavigation<NavigationProp<DriverStackParamList>>();
  const toast = useToast();
  const dispatch = useDispatch<StoreDispatch>();
  const updateUserProfile = async (
    userId: string | undefined,
    formData: UserSliceType,
  ) => {
    console.log(formData, 'formData');

    const toastId = toast.show('Updating Profile...', {type: 'normal'});

    try {
      await auth().currentUser?.updateProfile({
        displayName: formData.firstname,
      });
      const userDocRef = firestore().collection('users').doc(userId);
      await userDocRef.update(formData);

      toast.update(toastId, 'Profile Updated Successfully', {type: 'success'});

      console.log('User profile updated:', formData);
      dispatch(
        userActions.setUser({
          ...formData,
          isLoggedIn: true,
          uid: userId,
        }),
      );
      return true;
    } catch (error) {
      console.log(error, 'error');
      toast.update(toastId, 'Profile Update Failed. Please Try Again.', {
        type: 'danger',
      });
      return false;
    }
  };

  const updateRide = async (data: MyObjectType) => {
    const toastId = toast.show('Loading...', {type: 'normal'});
    try {
      const userDocRef = firestore().collection('rides').doc();
      await userDocRef.set(data);
      navigation.navigate('BottomTab', {screen: 'Home'});
      toast.update(toastId, 'Ride Completed Successfully', {type: 'success'});
    } catch (error) {
      console.log(error, 'error');
      toast.update(toastId, 'Error. Please Try Again.', {
        type: 'danger',
      });
    }
  };

  return {
    updateUserProfile,
    updateRide,
  };
};
