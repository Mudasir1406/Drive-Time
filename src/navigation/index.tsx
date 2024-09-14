import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthNavigation from './auth-navigation/auth-navigation';
import UserNavigation from './user-navigation/user-navigation';
import {useDispatch, useSelector} from 'react-redux';
import {StoreDispatch, StoreState} from '../redux/reduxStore';
import {userActions, userSliceIntialState} from '../redux/user/slice';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useAuth} from '../hooks/useAuth';
import DriverNavigation from './driver-navigation/driver-navigation';
import {
  configureGeolocation,
  requestLocationPermission,
} from '../utils/camera-permission';
import {ActivityIndicator, View, Text} from 'react-native'; // Import loading indicator

const AppContanier = () => {
  const {getUserById} = useAuth();
  const dispatch = useDispatch<StoreDispatch>();
  const userData = useSelector((state: StoreState) => state.user);

  const [loading, setLoading] = useState(true); // Manage loading state

  const getPermissions = async () => {
    const isLocation = await requestLocationPermission();
  };

  async function onAuthStateChanged(user: any) {
    if (user) {
      const data = await getUserById(user.uid);
      dispatch(
        userActions.setUser({
          ...data,
          isLoggedIn: true,
          uid: user.uid,
        }),
      );
    } else {
      dispatch(userActions.setUser(userSliceIntialState));
    }
  }

  useEffect(() => {
    configureGeolocation();
    getPermissions();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    const timer = setTimeout(() => setLoading(false), 3000);

    return () => {
      subscriber();
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userData.isLoggedIn ? (
        <>
          {userData.userType === 'user' ? (
            <UserNavigation />
          ) : userData.userType === 'driver' ? (
            <DriverNavigation />
          ) : (
            <AuthNavigation />
          )}
        </>
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
};

export default AppContanier;
