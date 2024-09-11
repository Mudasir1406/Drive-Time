/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppContanier from './src/navigation';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {Provider} from 'react-redux';
import reduxStore from './src/redux/reduxStore';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ToastProvider} from 'react-native-toast-notifications';

function App(): React.JSX.Element {
  return (
    <Provider store={reduxStore}>
      <SafeAreaProvider>
        
      <ToastProvider placement="top">
        <GluestackUIProvider config={config}>
          <AppContanier />
        </GluestackUIProvider>
      </ToastProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
