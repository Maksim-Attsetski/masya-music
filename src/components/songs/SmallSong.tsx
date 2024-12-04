import React, {FC, memo} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

import {ISong} from '../../types';
import {CONTAINER_PADDING, SONG_HEIGHT} from '../../constants';

const maxWidth = Dimensions.get('screen').width;

interface IProps {
  song: ISong | null;
}

const SmallSong: FC<IProps> = ({song}) => {
  return (
    <View style={styles.flex}>
      <View>
        {(song?.preview_url.length ?? 0) > 0 ? (
          <Image
            source={{
              uri: song?.preview_url,
              height: SONG_HEIGHT / 2,
              width: SONG_HEIGHT / 2,
            }}
            style={styles.image}
          />
        ) : (
          <View style={styles.box} />
        )}
      </View>
      <View>
        <Text style={styles.name}>{song?.name}</Text>
        <Text style={styles.description}>{song?.description}</Text>
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
  image: {
    borderRadius: SONG_HEIGHT * 0.1,
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

export default memo(SmallSong);
