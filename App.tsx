import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReactNativePaper } from 'react-native-paper';
import Navigation from '@Pokemon/navigation';

const App = (): JSX.Element => {

  return (
    <SafeAreaProvider>
      <ReactNativePaper>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </ReactNativePaper>
    </SafeAreaProvider>
  );
}

export default App;