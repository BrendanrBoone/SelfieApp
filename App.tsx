/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme
} from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme
} from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import StackNavigationScreen from './src/components/nav_stacks/StackNavigationScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <StackNavigationScreen />
    </NavigationContainer>
  );
}

export default App;
