import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';



const Stack = createStackNavigator();


export default function MainRoutes() {
  return (
   <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="home" component={Home} />
   </Stack.Navigator>
  )
}