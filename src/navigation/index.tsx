import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthNavigation from './auth-navigation/auth-navigation';
import UserNavigation from './user-navigation/user-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { StoreDispatch, StoreState } from '../redux/reduxStore';
import { userActions, userSliceIntialState } from '../redux/user/slice';
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../hooks/useAuth';
import DriverNavigation from './driver-navigation/driver-navigation';
const AppContanier = () => {

  const { getUserById } = useAuth()
  const dispatch = useDispatch<StoreDispatch>();
  const userData = useSelector((state: StoreState) => state.user);
  async function onAuthStateChanged(user: any) {
    if (user) {


      const data = await getUserById(user.uid)
      dispatch(
        userActions.setUser({
          ...data,
          isLoggedIn: true,
          uid: user.uid
        }),
      );
    } else {
      dispatch(userActions.setUser(userSliceIntialState));
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      {userData.isLoggedIn && userData.userType === 'user' ? (
        <UserNavigation />
      ) : userData.userType === 'driver' ? (
        <DriverNavigation />
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
};

export default AppContanier;
