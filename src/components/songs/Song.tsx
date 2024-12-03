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
}

const {width} = Dimensions.get('screen');

type TSongWithPos = ISong & {pos: number};

function clamp(val: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(val, min), max);
}

const changePositions = (positions: TPositions, from: number, to: number) => {
  'worlet';
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

const fromObjToList = (
  positions: TPositions,
  songs: ISong[],
): TSongWithPos[] => {
  const songsAsObj: {[key: string]: ISong} = {};
  const result: TSongWithPos[] = [];

  songs.forEach(song => {
    songsAsObj[song.id] = song;
  });

  for (const key in positions) {
    if (Object.prototype.hasOwnProperty.call(songsAsObj, key)) {
      result.push({...songsAsObj[key], pos: positions[key]});
    }
  }

  return result.sort((a, b) => a.pos - b.pos);
};

const Song: FC<IProps> = ({song, positions, scrollY}) => {
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const {setActiveSong, activeSong, songs, setSongs} = useMusicStore();

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
        songs.length - 1,
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
      setSongs(fromObjToList(positions.get(), songs)); // change song order

      setIsMoving(false);
    })
    .runOnJS(true);

  return (
    <Animated.View
      style={[
        styles.song,
        activeSong?.id === song.id && styles.activeSong,
        styles.flex,
        animatedStyles,
      ]}>
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
  activeSong: {
    backgroundColor: '#eee',
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
