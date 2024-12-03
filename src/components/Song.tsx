import React, {FC, memo, useState} from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import {ISong, TPositions} from '../types';
import {HEADER_HEIGHT, SONG_HEIGHT} from '../constants';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

interface IProps {
  song: ISong;
  positions: SharedValue<TPositions>;
  scrollY: SharedValue<number>;
  songsCount: number;
}

const {width} = Dimensions.get('screen');

function clamp(val: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(val, min), max);
}

const changePositions = (positions: TPositions, from: number, to: number) => {
  'worlet';
  console.log('newPositions in func', from, to);
  const newPositions = {...positions};
  for (const key in newPositions) {
    if (Object.prototype.hasOwnProperty.call(newPositions, key)) {
      const element = newPositions[key];
      if (element === from) {
        newPositions[key] = to;
      }
      if (element === to) {
        newPositions[key] = from;
      }
    }
  }

  return newPositions;
};

const Song: FC<IProps> = ({song, positions, songsCount, scrollY}) => {
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const top = useSharedValue(positions.get()[song.id] * SONG_HEIGHT);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      zIndex: isMoving ? 2 : 1,
      top: withSpring(positions.get()[song.id] * SONG_HEIGHT),
    };
  }, [isMoving]);

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      setIsMoving(true);
    })
    .onChange(event => {
      const newTop = scrollY.get() + event.absoluteY - HEADER_HEIGHT;
      top.set(withTiming(newTop - SONG_HEIGHT, {duration: 16}));

      const newPosition = clamp(
        Math.floor(newTop / SONG_HEIGHT),
        0,
        songsCount - 1,
      );

      if (newPosition !== positions.get()[song.id]) {
        const newPositions = changePositions(
          positions.get(),
          newPosition,
          positions.get()[song.id],
        );
        positions.set(newPositions);
      }
    })
    .onEnd(() => {
      setIsMoving(false);
    })
    .runOnJS(true);

  return (
    <Animated.View style={[styles.song, animatedStyles]}>
      <GestureDetector gesture={pan}>
        <Animated.View>
          <Text style={styles.name}>{song.name}</Text>
          <Text style={styles.description}>{song.id}</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  song: {
    height: SONG_HEIGHT,
    width: width * 0.8,
    position: 'absolute',
    left: 0,
    padding: 12,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 22,
  },
  description: {
    fontSize: 16,
    color: 'grey',
  },
});

export default memo(Song);
