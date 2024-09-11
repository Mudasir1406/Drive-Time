import {useToast} from 'react-native-toast-notifications';
import auth, {updateProfile} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
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
    userType: string;
    vehicleImages?: string[];
    vehicleDocuments?: string[];
    license?: string[];
    cnic?: string[];
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
  const logOut = async () => {
    auth()
      .signOut()
      .then(() => console.log('logout'));
  };

  const googleSignup = async () => {
    let id = toast.show('Loading...');
    try {
      // Configure Google Sign-In
      GoogleSignin.configure({
        webClientId:
          '1048277062240-ke4fg7dk77mn7fabtgkvml6cnnv238dv.apps.googleusercontent.com',
      });

      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // Get the user's ID token
      const userInfo = await GoogleSignin.signIn();

      // Create a Google credential with the token
      if (userInfo.data) {
        const googleCredential = auth.GoogleAuthProvider.credential(
          userInfo.data?.idToken,
        );
        const userCredential = await auth().signInWithCredential(
          googleCredential,
        );
        const user = userCredential.user;
        if (user.displayName) {
          const [firstName, ...lastNameParts] = user?.displayName.split(' ');
          const lastName = lastNameParts.join(' ');
          // Check if the user already exists in Firestore
          const userDoc = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();

          if (!userDoc.exists) {
            // User does not exist, so create a new user document
            await firestore().collection('users').doc(user.uid).set({
              email: user.email,
              firstname: firstName,
              lastname: lastName,
              phone: user.phoneNumber,
              dob: '',
              userType: 'user',
              username: '',
              gender: '',

              // Add other fields if needed
            });
          }
        }

        // Sign-in the user with the credential
      } else {
        console.log('alreadyCreated');

        //         // User already exists
        //       }
        //       toast.update(id, 'Login Success', {type: 'success'});
        //     } catch (error) {
        //       toast.update(id, 'Login Error', {type: 'danger '});
        //     }
        //   };
      }
      toast.update(id, 'Login Success', {type: 'success'});
    } catch (error) {
      toast.update(id, 'Login Error', {type: 'danger '});
    }
  };
  const getUserById = async (uid: string) => {
    return firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(user => user.data())
      .catch(err => console.log(err));
  };
  // User already exists

  return {signup, login, googleSignup, getUserById, logOut};
};
