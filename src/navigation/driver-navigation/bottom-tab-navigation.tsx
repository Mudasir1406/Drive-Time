import { config } from '@gluestack-ui/config';
import { RootBottomTabParamsDriver } from '../../types/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from '../../screens/driver/profile';
import { HomeDriver } from '../../screens';
import CustomDriverHeader from '../../components/common/header-driver';
const Tab = createBottomTabNavigator<RootBottomTabParamsDriver>();
const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarInactiveTintColor: config.tokens.colors.primary0,
                tabBarActiveTintColor: config.tokens.colors.secondary0,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'black',
                    borderRadius: 60,
                    height: 70,
                    overflow: 'hidden',
                    width: '90%',
                    bottom: 30,
                    left: '5%',
                },
                headerShown: true,
            }}>
            <Tab.Screen
                options={{
                    header: () => <CustomDriverHeader />,
                    tabBarLabelStyle: { marginBottom: 10 },
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
                name="Home"
                component={HomeDriver}
            />
            <Tab.Screen
                options={{
                    header: () => <CustomDriverHeader />,
                    tabBarLabelStyle: { marginBottom: 10 },
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="contacts" color={color} size={size} />
                    ),
                }}
                name="Profile"
                component={Profile}
            />
        </Tab.Navigator>
    );
};

export default BottomTab;

const styles = StyleSheet.create({});
