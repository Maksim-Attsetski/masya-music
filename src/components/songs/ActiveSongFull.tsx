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

import {CONTAINER_PADDING} from '../../constants';
import Gap from '../Gap';
import SongBar from './SongBar';
import {ISong} from '../../types';
import PlayPauseBtn from './PlayPauseBtn';

const maxWidth = Dimensions.get('screen').width;
const imgSize = maxWidth * 0.8;

interface IProps {
  playTime: number;
  setPlayTime: React.Dispatch<React.SetStateAction<number>>;
  prevSong: ISong | null;
  nextSong: ISong;
}

const ActiveSongFull: FC<IProps> = ({
  playTime,
  setPlayTime,
  nextSong,
  prevSong,
}) => {
  const {activeSong, setActiveSong, closeMusic} = useMusicStore();

  const onPressPrevSong = () => {
    if (playTime > (activeSong?.duration ?? 0) * 0.05) {
      setPlayTime(0);
      return;
    }
    if (prevSong) {
      setActiveSong(prevSong);
    } else {
      closeMusic();
    }
  };

  const onPressNextSong = () => {
    setActiveSong(nextSong);
  };

  return (
    <View style={styles.song}>
      <Image
        source={{uri: activeSong?.preview_url, height: imgSize, width: imgSize}}
        style={styles.songPreview}
      />
      <Gap />
      <View>
        <Text style={styles.name}>{activeSong?.name}</Text>
        <Text style={styles.description}>{activeSong?.description}</Text>
      </View>
      <Gap />
      <SongBar playTime={playTime} />

      <Gap y={20} />
      <View style={[styles.flex, styles.evenly]}>
        <TouchableOpacity style={styles.activeButton} onPress={onPressPrevSong}>
          <Text style={styles.activeButtonText}>{'<<'}</Text>
        </TouchableOpacity>
        <PlayPauseBtn />
        <TouchableOpacity style={styles.activeButton} onPress={onPressNextSong}>
          <Text style={styles.activeButtonText}>{'>>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  song: {
    paddingHorizontal: CONTAINER_PADDING,
  },
  songPreview: {
    alignSelf: 'center',
    borderRadius: 12,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  name: {
    fontSize: 24,
  },
  description: {
    fontSize: 14,
    color: 'grey',
  },
  between: {
    justifyContent: 'space-between',
  },
  evenly: {
    justifyContent: 'space-evenly',
  },
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

export default memo(ActiveSongFull);
