import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SCREENS } from '../utils/navigation';
import Home from '../screens/Home';
import AddNotes from '../screens/AddNotes';
import ViewNotes from '../screens/ViewNotes';
import AppSlider from '../screens/AppSlider';
import { navigationRef } from '../utils/NavigationService';

const Stack = createNativeStackNavigator();

interface AppNavigatorProps {
  initialRoute?: string;
}

export default function AppNavigator({initialRoute}: AppNavigatorProps) {
  return (
    <NavigationContainer ref={navigationRef}>
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREENS.Home} component={Home}/>
      <Stack.Screen name={SCREENS.AppSlider} component={AppSlider}/>
      <Stack.Screen name={SCREENS.AddNotes} component={AddNotes}/>
      <Stack.Screen name={SCREENS.ViewNotes} component={ViewNotes}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}