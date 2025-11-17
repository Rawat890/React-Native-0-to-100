import React from 'react'
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'

function App() {
  return (
    <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
    <AppNavigator/>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App;