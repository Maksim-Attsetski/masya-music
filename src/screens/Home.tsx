import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {useMusicStore} from '../store';
import {Layout} from '../components';

const Home: FC = () => {
  const {isPlaying, activeSong, playMusic, setIsPlaying} = useMusicStore();

  const onPressMyVibe = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (activeSong) {
        setIsPlaying(true);
      } else {
        playMusic();
      }
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <TouchableOpacity style={styles.myVibe} onPress={onPressMyVibe}>
          <FontAwesome5
            name={isPlaying ? 'pause' : 'play'}
            size={32}
            color="black"
          />
          <Text style={styles.myVibeText}>Мой вайб</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myVibe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  myVibeText: {
    fontWeight: 700,
    letterSpacing: 0.5,
    fontSize: 24,
  },
});

export default memo(Home);
