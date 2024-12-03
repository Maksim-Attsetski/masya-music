import React, {FC, memo, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ISong, TPositions} from '../../types';
import {HEADER_HEIGHT, SONG_HEIGHT} from '../../constants';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useMusicStore} from '../../store';

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

  const {setActiveSong} = useMusicStore();

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
    <Animated.View style={[styles.song, styles.flex, animatedStyles]}>
      <TouchableOpacity
        onPress={() => {
          setActiveSong(null);
          setActiveSong(song);
        }}
        style={styles.flex}>
        <View>
          {song.preview_url.length > 0 ? (
            <Image
              source={{
                uri: song.preview_url,
                height: SONG_HEIGHT / 2,
                width: SONG_HEIGHT / 2,
              }}
            />
          ) : (
            <View style={styles.box} />
          )}
        </View>
        <View>
          <Text style={styles.name}>{song.name}</Text>
          <Text style={styles.description}>{song.description}</Text>
        </View>
      </TouchableOpacity>
      <GestureDetector gesture={pan}>
        <View>
          <View style={styles.songDragElement} />
          <View style={styles.divider} />
          <View style={styles.songDragElement} />
          <View style={styles.divider} />
          <View style={styles.songDragElement} />
        </View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  song: {
    height: SONG_HEIGHT,
    width: width * 0.99,
    position: 'absolute',
    left: 0,
    padding: 12,
    backgroundColor: '#fff',
  },
  songDragElement: {
    width: 20,
    height: 2,
    backgroundColor: '#444',
  },
  divider: {
    height: 5,
  },
  name: {
    fontSize: 22,
  },
  description: {
    fontSize: 16,
    color: 'grey',
  },
  box: {
    width: SONG_HEIGHT / 2,
    height: SONG_HEIGHT / 2,
    backgroundColor: 'grey',
  },
});

export default memo(Song);
