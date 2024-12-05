import React, {FC, memo, PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CONTAINER_PADDING} from '../../constants';
import {ActiveSong} from '../songs';

interface IProps extends PropsWithChildren {
  withActiveSong?: boolean;
}

const Layout: FC<IProps> = ({children, withActiveSong = true}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          StyleSheet.absoluteFill,
          {paddingHorizontal: CONTAINER_PADDING},
        ]}>
        {children}
        {withActiveSong && <ActiveSong />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default memo(Layout);
