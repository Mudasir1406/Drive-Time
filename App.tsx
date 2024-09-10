/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppContanier from './src/navigation';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';





function App(): React.JSX.Element {



  return (
    <GluestackUIProvider config={config}>
      <AppContanier />
    </GluestackUIProvider>
  );
}



export default App;
