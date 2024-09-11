import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthNavigation from './auth-navigation/auth-navigation';
import UserNavigation from './user-navigation/user-navigation';

const AppContanier = () => {
  return (
    <NavigationContainer>
      <UserNavigation />
    </NavigationContainer>
  );
};

export default AppContanier;
