import React, {FC, memo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import {useMusicStore} from '../../store';

const PlayPauseBtn: FC<TouchableOpacityProps> = props => {
  const {setIsPlaying, isPlaying} = useMusicStore();

  return (
    <TouchableOpacity
      {...props}
      style={[styles.activeButton, props.style]}
      onPress={() => setIsPlaying()}>
      <Text style={styles.activeButtonText}>{isPlaying ? '||' : '|>'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  activeButton: {
    backgroundColor: '#eee',
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
  },
  activeButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 900,
  },
});

export default memo(PlayPauseBtn);
