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
  StaticParamList,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home, MyCollection, Profile, SongOrder} from './src/screens';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const TabStack = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    tabBarStyle: {
      paddingTop: 6,
    },
    animation: 'shift',
  },
  screens: {
    Home: {
      screen: Home,
      options: {
        tabBarIcon: ({size, focused}) => (
          <MaterialCommunityIcons
            name="music"
            size={size}
            color={focused ? '#444' : '#777'}
          />
        ),
        tabBarShowLabel: false,
      },
    },
    MyCollection: {
      screen: MyCollection,
      options: {
        tabBarIcon: ({size, focused}) => (
          <MaterialCommunityIcons
            name="folder-heart-outline"
            size={size}
            color={focused ? '#444' : '#777'}
          />
        ),
        tabBarShowLabel: false,
      },
    },
    Profile: {
      screen: Profile,
      options: {
        tabBarIcon: ({size, focused}) => (
          <AntDesign
            name="user"
            size={size}
            color={focused ? '#444' : '#777'}
          />
        ),
        tabBarShowLabel: false,
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  initialRouteName: 'Tabs',
  screens: {
    Tabs: TabStack,
    SongOrder,
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
