import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserStackParamList} from '../../types/types';
import BottomTab from './botton-tab-navigation';

const RootStack = createNativeStackNavigator<UserStackParamList>();
const UserNavigation = () => {
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
    </RootStack.Navigator>
  );
};

export default UserNavigation;

const styles = StyleSheet.create({});
