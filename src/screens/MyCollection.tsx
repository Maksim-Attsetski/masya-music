import React, {FC, memo, useMemo} from 'react';
import {Layout} from '../components';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useMusicStore, usePlaylistStore} from '../store';

const MyCollection: FC = () => {
  const {playlists} = usePlaylistStore();

  const myFavorite = useMemo(
    () => playlists.find(p => p.id === 'favorite'),
    [playlists],
  );

  const firstNine = useMemo(
    () => myFavorite?.tracks?.slice?.(0, 9) ?? null,
    [myFavorite],
  );

  return (
    <Layout>
      <View>
        <Text>Мой вайб для</Text>
        <Text>Моей коллекции</Text>
      </View>

      <FlatList
        data={firstNine}
        renderItem={({item, index}) => (
          <View>
            <Text>
              {index + 1}. {item.name}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View>
            <Text>Добавьте что-нибудь в избранное</Text>
          </View>
        }
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  vibeContainer: {},
});

export default memo(MyCollection);
