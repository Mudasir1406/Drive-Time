import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthNavigation from './auth-navigation/auth-navigation';
import UserNavigation from './user-navigation/user-navigation';
import {useSelector} from 'react-redux';
import {StoreState} from '../redux/reduxStore';

const AppContanier = () => {
  const userData = useSelector((state: StoreState) => state.user);
  return (
    <NavigationContainer>
      {userData.isLoggedIn && userData.type !== 'user' ? (
        <UserNavigation />
      ) : userData.type === 'driver' ? (
        <></>
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
};

export default AppContanier;
