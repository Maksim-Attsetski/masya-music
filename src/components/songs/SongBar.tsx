import React, {FC, memo, useMemo} from 'react';
import {useMusicStore} from '../../store';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

import {CONTAINER_PADDING} from '../../constants';
import Gap from '../ui/Gap';

const maxWidth = Dimensions.get('screen').width;

interface IProps {
  playTime: number;
}

const getDuration = (time: number = 1) => {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);
  return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
};

const SongBar: FC<IProps> = ({playTime}) => {
  const {activeSong} = useMusicStore();

  const animatedBarStyle = useAnimatedStyle(() => {
    const barWidth = maxWidth - CONTAINER_PADDING * 2;
    const percent = playTime / (activeSong?.duration ?? playTime);

    return {
      width: withTiming(barWidth * percent),
    };
  });

  const rightPlayTime = useMemo(() => getDuration(playTime), [playTime]);
  const rightDuration = useMemo(
    () => getDuration(activeSong?.duration),
    [activeSong?.duration],
  );

  return (
    <View>
      <View style={styles.barContainer}>
        <View style={styles.bar} />
        <Animated.View style={[styles.activeBar, animatedBarStyle]} />
      </View>
      <Gap y={6} />
      <View style={[styles.flex, styles.timer]}>
        <Text>{rightPlayTime}</Text>
        <Text>{rightDuration}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  song: {
    width: maxWidth - 0.0001,
    maxWidth,

    paddingHorizontal: CONTAINER_PADDING,
    paddingVertical: 6,
    justifyContent: 'center',
    gap: 6,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timer: {
    justifyContent: 'space-between',
  },
  barContainer: {
    position: 'relative',
  },
  bar: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: 'gray',
  },
  activeBar: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'red',
  },
});

export default memo(SongBar);
