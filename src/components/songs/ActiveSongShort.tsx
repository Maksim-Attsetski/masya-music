import React, {FC, memo} from 'react';
import {useMusicStore} from '../../store';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {CONTAINER_PADDING, SONG_HEIGHT} from '../../constants';
import SongBar from './SongBar';

const maxWidth = Dimensions.get('screen').width;

interface IProps {
  playTime: number;
}

const ActiveSongShort: FC<IProps> = ({playTime}) => {
  const {activeSong, isPlaying, setIsPlaying} = useMusicStore();

  return (
    <View style={styles.song}>
      <View style={[styles.flex, styles.timer]}>
        <View style={styles.flex}>
          <View>
            {(activeSong?.preview_url.length ?? 0) > 0 ? (
              <Image
                source={{
                  uri: activeSong?.preview_url,
                  height: SONG_HEIGHT / 2,
                  width: SONG_HEIGHT / 2,
                }}
              />
            ) : (
              <View style={styles.box} />
            )}
          </View>
          <View>
            <Text style={styles.name}>{activeSong?.name}</Text>
            <Text style={styles.description}>{activeSong?.description}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.activeButton}
          onPress={() => setIsPlaying()}>
          <Text style={styles.activeButtonText}>{isPlaying ? '||' : '|>'}</Text>
        </TouchableOpacity>
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

export default memo(ActiveSongShort);
