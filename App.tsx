import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    // <SafeAreaProvider>
    //   <AppNavigator />
    // </SafeAreaProvider>

     <NavigationContainer>
     <AppNavigator />
    </NavigationContainer>
  );
};

export default App;