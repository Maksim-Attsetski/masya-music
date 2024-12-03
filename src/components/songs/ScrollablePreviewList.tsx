import React, {FC, memo, useEffect, useMemo, useRef} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';

import {useMusicStore} from '../../store';
import {ISong} from '../../types';

const screenWidth = Dimensions.get('screen').width;
const imgSize = screenWidth * 0.8;

const ScrollablePreviewList: FC = () => {
  const {songs, activeSong, setActiveSong} = useMusicStore();
  const listRef = useRef<FlatList>(null);

  const onScrollTo = (index: number = 0) => {
    listRef.current?.scrollToOffset({
      animated: false, // TODO change to true
      offset: index * imgSize,
    });
  };

  const activeInx = useMemo(
    () => songs.findIndex(s => s.id === activeSong?.id),
    [songs, activeSong],
  );

  const onScrollToCurrentSong = () => {
    onScrollTo(activeInx >= 0 ? activeInx : 0);
  };

  useEffect(() => {
    activeSong && onScrollToCurrentSong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSong]);

  return (
    <FlatList
      key={'songs-scrollable-list-flatlist'}
      data={songs}
      horizontal
      ref={listRef}
      scrollEnabled
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      maxToRenderPerBatch={2}
      windowSize={5}
      style={styles.list}
      keyExtractor={item => item.id}
      getItemLayout={(
        data: ArrayLike<ISong> | null | undefined,
        index: number,
      ) => {
        return {
          length: data?.length ?? songs.length,
          offset: index * imgSize,
          index,
        };
      }}
      snapToInterval={imgSize}
      onScrollEndDrag={event => {
        const {x} = event.nativeEvent.contentOffset;
        const newInx = Math.round(x / imgSize);

        if (newInx !== activeInx) {
          const newActiveSong = songs.find((_, inx) => inx === newInx);
          newActiveSong && setActiveSong(newActiveSong);
        }
      }}
      renderItem={({item}) => (
        <Image
          source={{uri: item?.preview_url, height: imgSize, width: imgSize}}
          style={styles.songPreview}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  songPreview: {
    alignSelf: 'center',
    borderRadius: 12,
  },
  list: {
    width: imgSize,
    alignSelf: 'center',
  },
});
export default memo(ScrollablePreviewList);
