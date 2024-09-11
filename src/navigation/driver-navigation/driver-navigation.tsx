import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DriverStackParamList } from '../../types/types';
import BottomTab from './bottom-tab-navigation';

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
        </RootStack.Navigator>
    );
};

export default DriverNavigation;

const styles = StyleSheet.create({});
