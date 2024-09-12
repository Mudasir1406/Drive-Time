import {config} from '@gluestack-ui/config';
import {RootBottomTabParams} from '../../types/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../../screens/user/home';
import Profile from '../../screens/user/profile';
import {Header} from '../../components';
const Tab = createBottomTabNavigator<RootBottomTabParams>();
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
      }}>
      <Tab.Screen
        options={{
          tabBarLabelStyle: {marginBottom: 10},
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          header: props => <Header heading={props.route.name} />,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabelStyle: {marginBottom: 10},
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
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
