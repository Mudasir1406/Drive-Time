import {useToast} from 'react-native-toast-notifications';
import auth, {updateProfile} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export const useAuth = () => {
  const toast = useToast();
  const signup = async (formData: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    dob: string;
    username: string;
    gender: string;
  }) => {
    const {firstname, email, password} = formData;

    const toastId = toast.show('Loading...', {type: 'normal'});
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const userId = userCredential.user.uid;
      await updateProfile(userCredential.user, {
        displayName: firstname,
      });
      // Store user data in Firestore
      const userDocRef = firestore().collection('users').doc(userId);
      console.log('Document Reference:', userDocRef.path);
      await userDocRef.set(formData);

      toast.update(toastId, 'Signup Success', {type: 'success'});
      console.log('User created:', userCredential.user);
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.update(toastId, 'Email Already in Use', {
            type: 'danger',
          });
          break;
        case 'auth/invalid-email':
          toast.update(toastId, 'Invalid Email Address', {type: 'danger'});
          break;
        case 'auth/weak-password':
          toast.update(toastId, 'Password Should be at Least 6 Characters', {
            type: 'danger',
          });
          break;
        default:
          toast.update(toastId, 'Sign Up Error. Please Try Again.', {
            type: 'danger',
          });
          console.log(error, 'error');
      }
    }
  };

  const login = async (formData: {email: string; password: string}) => {
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.show('fill all the fields', {type: 'danger'});
      return;
    }
    let id = toast.show('Loading...');
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        formData.email,
        formData.password,
      );
      console.log('User signed:', userCredential.user);
      toast.update(id, 'Login Success', {type: 'success'});
    } catch (error) {
      console.log('Error creating user:', error);
      toast.update(id, 'Login Error', {type: 'danger '});
    }
  };

  //   const googleSignup = async () => {
  //     let id = toast.show('Loading...');
  //     try {
  //       // Configure Google Sign-In
  //       GoogleSignin.configure({
  //         webClientId:
  //           '499076693311-jhkkbtecp1qjnhusnm32fnppkb4aoi91.apps.googleusercontent.com',
  //       });

  //       // Check if your device supports Google Play
  //       await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

  //       // Get the user's ID token
  //       const {idToken} = await GoogleSignin.signIn();

  //       // Create a Google credential with the token
  //       const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //       // Sign-in the user with the credential
  //       const userCredential = await auth().signInWithCredential(
  //         googleCredential,
  //       );
  //       const user = userCredential.user;
  //       console.log(user.uid, 'user.uid');

  //       // Check if the user already exists in Firestore
  //       const userDoc = await firestore().collection('users').doc(user.uid).get();
  //       console.log(userDoc, 'userDoc');

  //       if (!userDoc.exists) {
  //         // User does not exist, so create a new user document
  //         await firestore().collection('users').doc(user.uid).set({
  //           email: user.email,
  //           name: user.displayName,
  //           phone: user.phoneNumber,
  //           // Add other fields if needed
  //         });
  //       } else {
  //         console.log('alreadyCreated');

  //         // User already exists
  //       }
  //       toast.update(id, 'Login Success', {type: 'success'});
  //     } catch (error) {
  //       toast.update(id, 'Login Error', {type: 'danger '});
  //     }
  //   };
  return {signup, login};
};
