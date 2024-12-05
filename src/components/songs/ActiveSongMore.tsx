import React, {FC, memo, RefObject} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useMusicStore} from '../../store';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CONTAINER_PADDING} from '../../constants';
import Gap from '../ui/Gap';
import SmallSong from './SmallSong';

interface IMainProps {
  bottomSheetRef: RefObject<BottomSheetMethods>;
}
interface IActionProps {
  text: string;
  icon: string;
  onPress: () => void;
}

const Action: FC<IActionProps> = ({icon, onPress, text}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <AntDesign name={icon} size={20} color="black" />
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

const ActiveSongMore: FC<IMainProps> = ({bottomSheetRef}) => {
  const {activeSong} = useMusicStore();

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['30%', '100%']}
      enableDynamicSizing
      enablePanDownToClose>
      <BottomSheetView>
        <View style={styles.container}>
          <SmallSong song={activeSong} />
          <Gap />
          <Action icon="hearto" onPress={() => {}} text="Лайк" />
          <Action icon="download" onPress={() => {}} text="Скачать" />
          <Action icon="plus" onPress={() => {}} text="Добавить в плейлист" />
          <Action icon="sharealt" onPress={() => {}} text="Поделиться" />
          <Action icon="user" onPress={() => {}} text="Перейти к артисту" />
          <Action icon="delete" onPress={() => {}} text="Удалить из очереди" />
          <Action icon="infocirlceo" onPress={() => {}} text="Детали" />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '99.9999%',
    paddingHorizontal: CONTAINER_PADDING,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default memo(ActiveSongMore);
