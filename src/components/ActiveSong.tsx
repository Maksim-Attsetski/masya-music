import React, {FC, memo, useEffect, useMemo, useState} from 'react';
import {useMusicStore} from '../store';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SONG_HEIGHT} from '../constants';
import Animated, {
  FadeInDown,
  FadeOut,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const maxWidth = Dimensions.get('screen').width;
const paddingHorizontal = 12;

const ActiveSong: FC = () => {
  const {activeSong, setActiveSong, songs} = useMusicStore();

  const [isPlaying, setIsPlaying] = useState<boolean>(!!activeSong);
  const [playTime, setPlayTime] = useState<number>(0);

  const nextSong = useMemo(() => {
    const songIndex = songs.findIndex(s => s.id === activeSong?.id);
    return songIndex === -1
      ? songs[0] // if not found get first song
      : songs[songIndex + 1] // else check is next song exist
      ? songs[songIndex + 1] // get next song
      : songs[0]; // or return to start
  }, [activeSong, songs]);

  useEffect(() => {
    setIsPlaying(!!activeSong);
    setPlayTime(0);
  }, [activeSong]);

  useEffect(() => {
    const clear = () => {
      clearInterval(timer);
    };

    let timer: any;
    if (isPlaying && activeSong) {
      timer = setInterval(() => {
        setPlayTime(prev => {
          if (prev < activeSong?.duration) {
            return prev + 10;
          } else {
            // song is ended;
            setActiveSong(nextSong);
            return 0;
          }
        });
      }, 1000);
    } else {
      clear();
    }

    return clear;
  }, [isPlaying, activeSong, setActiveSong, nextSong]);

  const animatedBarStyle = useAnimatedStyle(() => {
    const barWidth = maxWidth - paddingHorizontal * 2;
    const percent = playTime / (activeSong?.duration ?? playTime);

    return {
      width: withTiming(barWidth * percent),
    };
  });

  return activeSong ? (
    <Animated.View
      key={activeSong.id}
      entering={FadeInDown}
      exiting={FadeOut}
      style={styles.song}>
      <View style={[styles.flex, styles.timer]}>
        <View style={styles.flex}>
          <View>
            {activeSong.preview_url.length > 0 ? (
              <Image
                source={{
                  uri: activeSong.preview_url,
                  height: SONG_HEIGHT / 2,
                  width: SONG_HEIGHT / 2,
                }}
              />
            ) : (
              <View style={styles.box} />
            )}
          </View>
          <View>
            <Text style={styles.name}>{activeSong.name}</Text>
            <TouchableOpacity onPress={() => setActiveSong(null)}>
              <Text style={styles.description}>{activeSong.description}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.activeButton}
          onPress={() => setIsPlaying(prev => !prev)}>
          <Text style={styles.activeButtonText}>{isPlaying ? '||' : '|>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.barContainer}>
        <View style={styles.bar} />
        <Animated.View style={[styles.activeBar, animatedBarStyle]} />
      </View>
      <View style={[styles.flex, styles.timer]}>
        <Text>{playTime}</Text>
        <Text>{activeSong?.duration}</Text>
      </View>
    </Animated.View>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  song: {
    // height: SONG_HEIGHT,
    width: maxWidth - 0.0001,
    maxWidth,

    paddingHorizontal,
    paddingVertical: 6,
    backgroundColor: '#eee',
    justifyContent: 'center',
    gap: 6,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    zIndex: 5,
  },
  activeButton: {
    backgroundColor: '#fff',
    width: SONG_HEIGHT / 2,
    height: SONG_HEIGHT / 2,
    justifyContent: 'center',
    borderRadius: 16,
  },
  activeButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 900,
  },
});

export default memo(ActiveSong);
