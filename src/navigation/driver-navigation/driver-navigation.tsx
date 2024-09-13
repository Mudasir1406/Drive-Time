import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DriverStackParamList} from '../../types/types';
import BottomTab from './bottom-tab-navigation';
import EditProfile from '../../screens/driver/edit-profile';

const RootStack = createNativeStackNavigator<DriverStackParamList>();
const DriverNavigation = () => {
  return (
    <RootStack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
      }}>
      <RootStack.Screen name="BottomTab" component={BottomTab} />
      <RootStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: true,
          title: 'Edit Profile',
          headerStyle: {
            backgroundColor: '#f8f9fa',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </RootStack.Navigator>
  );
};

export default DriverNavigation;

const styles = StyleSheet.create({});
