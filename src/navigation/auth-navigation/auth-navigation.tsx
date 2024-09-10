import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import { Guide, Login, LoginTypes, SignUpDriver, UserSignUp } from '../../screens/auth';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthNavigation = () => {
  return (
    <RootStack.Navigator
      initialRouteName="guide"
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
      <RootStack.Screen name="guide" component={Guide} />

      <RootStack.Screen name="LoginType" component={LoginTypes} />
      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen name="SignUpUser" component={UserSignUp} />
      <RootStack.Screen name="SignUpDriver" component={SignUpDriver} />
    </RootStack.Navigator>
  )
}

export default AuthNavigation

const styles = StyleSheet.create({})