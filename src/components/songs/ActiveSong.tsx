import React, {FC, memo, useEffect, useMemo, useRef, useState} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

import {useMusicStore} from '../../store';
import ActiveSongShort from './ActiveSongShort';
import ActiveSongFull from './ActiveSongFull';

const ActiveSong: FC = () => {
  const {
    activeSong,
    songs,
    isPlaying,
    setActiveSong,
    setIsPlaying,
    closeMusic,
  } = useMusicStore();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [playTime, setPlayTime] = useState<number>(0);
  const [bottomSheetInx, setBottomSheetInx] = useState<number>(-1);

  const prevSong = useMemo(() => {
    const songIndex = songs.findIndex(s => s.id === activeSong?.id);
    return songIndex === -1
      ? null // if not found we should disabel prev btn
      : songs[songIndex - 1] // else check is next song exist
      ? songs[songIndex - 1] // get next song
      : null; // or return null
  }, [activeSong, songs]);
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
  }, [activeSong, setIsPlaying]);

  useEffect(() => {
    const clear = () => {
      clearInterval(timer);
    };

    let timer: any;
    if (isPlaying && activeSong) {
      timer = setInterval(() => {
        setPlayTime(prev => {
          if (prev < activeSong?.duration) {
            return prev + 1;
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

  useEffect(() => {
    setBottomSheetInx(prev => (activeSong ? (prev > 0 ? prev : 0) : -1));
  }, [activeSong]);

  useEffect(() => {
    if (bottomSheetInx === -1) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.snapToIndex(bottomSheetInx);
    }
  }, [bottomSheetInx]);

  return (
    <BottomSheet
      index={-1}
      snapPoints={['20%', '100%']}
      enableDynamicSizing
      enablePanDownToClose
      onAnimate={(_, to) => setBottomSheetInx(to)}
      ref={bottomSheetRef}
      onClose={closeMusic}>
      <BottomSheetView>
        {bottomSheetInx > 1 && (
          <ActiveSongFull
            nextSong={nextSong}
            prevSong={prevSong}
            setPlayTime={setPlayTime}
            playTime={playTime}
          />
        )}
        {(bottomSheetInx === 1 || bottomSheetInx === 0) && (
          <ActiveSongShort playTime={playTime} />
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default memo(ActiveSong);
