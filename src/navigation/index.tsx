import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthNavigation from './auth-navigation/auth-navigation';

const AppContanier = () => {


    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <AuthNavigation />
            </SafeAreaProvider>

        </NavigationContainer>
    );
};

export default AppContanier;