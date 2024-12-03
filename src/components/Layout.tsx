import React, {FC, memo, PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CONTAINER_PADDING} from '../constants';

const Layout: FC<PropsWithChildren> = ({children}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          StyleSheet.absoluteFill,
          {paddingHorizontal: CONTAINER_PADDING},
        ]}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default memo(Layout);
