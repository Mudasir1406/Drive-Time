import { config } from '@gluestack-ui/config';
import { RootBottomTabParamsDriver } from '../../types/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from '../../screens/driver/profile';
import { DriverRide, HomeDriver } from '../../screens';
import CustomDriverHeader from '../../components/common/header-driver';
import { colors } from '../../constant';
import HeaderDriverOne from '../../components/common/header-driver-one';
const Tab = createBottomTabNavigator<RootBottomTabParamsDriver>();
const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarInactiveTintColor: colors.grey,
                tabBarActiveTintColor: config.tokens.colors.primary0,
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
                    header: () => <HeaderDriverOne title={'Home'} />,
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
                    header: () => <CustomDriverHeader title={'Find Rides'} />,
                    tabBarLabelStyle: { marginBottom: 10 },
                    tabBarLabel: 'Ride',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="motorbike" color={color} size={35} />
                    ),
                }}
                name="Ride"
                component={DriverRide}
            />
            <Tab.Screen
                options={{
                    header: () => <HeaderDriverOne title={'Profile'} />,
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
