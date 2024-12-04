import React, {FC, memo} from 'react';
import {Layout} from '../components';
import {Text} from 'react-native';

const MyCollection: FC = () => {
  return (
    <Layout>
      <Text>Мои любимые</Text>
      <Text>треки</Text>
    </Layout>
  );
};

export default memo(MyCollection);
