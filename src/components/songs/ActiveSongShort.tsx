import React, {FC, memo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import {useMusicStore} from '../../store';
import {CONTAINER_PADDING, SONG_HEIGHT} from '../../constants';
import SongBar from './SongBar';
import SmallSong from './SmallSong';
import PlayPauseBtn from './PlayPauseBtn';

const maxWidth = Dimensions.get('screen').width;

interface IProps {
  playTime: number;
}

const ActiveSongShort: FC<IProps> = ({playTime}) => {
  const {activeSong} = useMusicStore();

  return (
    <View style={styles.song}>
      <View style={[styles.flex, styles.timer]}>
        <SmallSong song={activeSong} />
        <PlayPauseBtn size="small" />
      </View>
      <SongBar playTime={playTime} />
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

export default memo(ActiveSongShort);
