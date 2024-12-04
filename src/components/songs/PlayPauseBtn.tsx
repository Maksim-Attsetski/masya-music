import React, {FC, memo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {useMusicStore} from '../../store';

type TBtnSize = 'medium' | 'small';

interface IProps extends TouchableOpacityProps {
  size?: TBtnSize;
}

const PlayPauseBtn: FC<IProps> = props => {
  const {setIsPlaying, isPlaying} = useMusicStore();

  const styles = getStyles(props.size);

  return (
    <TouchableOpacity
      {...props}
      style={[styles.activeButton, props.style]}
      onPress={() => setIsPlaying()}>
      <FontAwesome5Icon
        name={isPlaying ? 'pause' : 'play'}
        size={20}
        style={styles.activeButtonText}
        color="black"
      />
    </TouchableOpacity>
  );
};

const getStyles = (size: TBtnSize = 'medium') =>
  StyleSheet.create({
    activeButton: {
      backgroundColor: size === 'medium' ? '#eee' : 'transparent',
      width: 50,
      height: 50,
      justifyContent: 'center',
      borderRadius: 50,
    },
    activeButtonText: {
      textAlign: 'center',
    },
  });

export default memo(PlayPauseBtn);
