import React, {FC, memo, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import {ISong, TPositions} from '../types';
import Song from './Song';
import {HEADER_HEIGHT, SONG_HEIGHT} from '../constants';
import {useMusicStore} from '../store';

const getPositions = (songs: ISong[]): TPositions => {
  const result: TPositions = {};

  songs.forEach(({id}, inx) => {
    result[id] = inx;
  });

  return result;
};

const Player: FC = () => {
  const {songs} = useMusicStore();

  const scrollY = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler(event => {
    scrollY.set(event.contentOffset.y);
  });

  const positions = useSharedValue(getPositions(songs));

  // const sortedSongs = useMemo(
  //   () =>
  //     songs.sort(
  //       (prev, cur) => positions.value[prev.id] - positions.value[cur.id],
  //     ),
  //   [songs, positions],
  // );

  return (
    <>
      <View style={{height: HEADER_HEIGHT}}>
        <Text>Header</Text>
        <Text>Header</Text>
        <Text>Header</Text>
      </View>
      <Animated.ScrollView
        onScroll={onScrollHandler}
        style={[styles.contentContainer, {height: SONG_HEIGHT * songs.length}]}
        contentContainerStyle={{
          height: SONG_HEIGHT * songs.length,
        }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        {songs.map(item => (
          <Song
            key={item.id}
            scrollY={scrollY}
            songsCount={songs.length}
            positions={positions}
            song={item}
          />
        ))}
      </Animated.ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    position: 'relative',
    backgroundColor: 'lightgrey',
    flex: 1,
  },
});

export default memo(Player);
