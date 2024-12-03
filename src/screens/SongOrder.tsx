import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useMusicStore} from '../store';
import Layout from '../components/Layout';
import {Player} from '../components';

const SongOrder: FC = () => {
  const {activeSong, songs} = useMusicStore();

  return (
    <>
      <Player />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myVibeText: {
    fontWeight: 700,
    letterSpacing: 0.5,
    fontSize: 24,
  },
});

export default memo(SongOrder);
