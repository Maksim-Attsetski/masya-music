import React, {FC, memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Logo: FC = () => {
  return (
    <View>
      <Text style={styles.text}>Masya Music</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: 700,
    color: 'red',
  },
});

export default memo(Logo);
