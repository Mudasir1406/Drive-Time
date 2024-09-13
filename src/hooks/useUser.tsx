import {useToast} from 'react-native-toast-notifications';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {StoreDispatch} from '../redux/reduxStore';
import {userActions} from '../redux/user/slice';

export const useUser = () => {
  const toast = useToast();
  const dispatch = useDispatch<StoreDispatch>();
  const updateUserProfile = async (
    userId: string | undefined,
    formData: {
      firstname?: string;
      lastname?: string;
      email?: string;
      phone?: string;

      dob?: string;
      username?: string;
      gender?: string;
      userType?: string;
      vehicleImages?: string[];
      vehicleDocuments?: string[];
      license?: string[];
      cnic?: string[];
      profile?: string;
    },
  ) => {
    const toastId = toast.show('Updating Profile...', {type: 'normal'});

    try {
      await auth().currentUser?.updateProfile({
        displayName: formData.firstname,
      });
      const userDocRef = firestore().collection('users').doc(userId);
      await userDocRef.update(formData);

      toast.update(toastId, 'Profile Updated Successfully', {type: 'success'});

      console.log(formData, 'User profile updated:');
      dispatch(userActions.setUser(formData));
    } catch (error) {
      toast.update(toastId, 'Profile Update Failed. Please Try Again.', {
        type: 'danger',
      });
      console.error('Error updating profile:', error);
    }
  };

  return {
    updateUserProfile,
  };
};
