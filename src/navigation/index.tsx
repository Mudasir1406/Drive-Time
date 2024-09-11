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
      {userData && userData.type === 'User' ? (
        <UserNavigation />
      ) : userData.type === 'Driver' ? (
        <></>
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
};

export default AppContanier;
