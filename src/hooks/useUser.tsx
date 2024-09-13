import { useToast } from 'react-native-toast-notifications';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { StoreDispatch } from '../redux/reduxStore';
import { userActions, UserSliceType } from '../redux/user/slice';

export const useUser = () => {
  const toast = useToast();
  const dispatch = useDispatch<StoreDispatch>();
  const updateUserProfile = async (
    userId: string | undefined,
    formData: UserSliceType,
  ) => {
    console.log(formData, 'formData');

    const toastId = toast.show('Updating Profile...', { type: 'normal' });

    try {
      await auth().currentUser?.updateProfile({
        displayName: formData.firstname,
      });
      const userDocRef = firestore().collection('users').doc(userId);
      await userDocRef.update(formData);

      toast.update(toastId, 'Profile Updated Successfully', { type: 'success' });

      console.log('User profile updated:', formData);
      dispatch(userActions.setUser({
        ...formData,
        isLoggedIn: true,
        uid: userId,
      }));
      return true;
    } catch (error) {
      toast.update(toastId, 'Profile Update Failed. Please Try Again.', {
        type: 'danger',
      });
      return false;
      console.error('Error updating profile:', error);
    }
  };

  return {
    updateUserProfile,
  };
};
