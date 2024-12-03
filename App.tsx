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
import {
  createStaticNavigation,
  NavigationContainer,
  StaticParamList,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ActiveSong} from './src';
import {Home, Profile, SongOrder} from './src/screens';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const RootStack = createNativeStackNavigator({
  screens: {
    Home,
    SongOrder,
    Profile,
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Navigation = createStaticNavigation(RootStack);

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Navigation />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
