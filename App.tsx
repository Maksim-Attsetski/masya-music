/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ActiveSong} from './src';
import {Home} from './src/screens';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const RootStack = createNativeStackNavigator({
  screens: {
    Home,
  },
});

const Navigation = createStaticNavigation(RootStack);

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Navigation />
      <ActiveSong />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
