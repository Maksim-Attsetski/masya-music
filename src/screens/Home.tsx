import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useMusicStore} from '../store';
import Layout from '../components/Layout';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        <TouchableOpacity onPress={onPressMyVibe}>
          <MaterialCommunityIcons
            name="folder-heart-outline"
            size={24}
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
  myVibeText: {
    fontWeight: 700,
    letterSpacing: 0.5,
    fontSize: 24,
  },
});

export default memo(Home);
