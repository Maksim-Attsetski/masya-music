import React, {FC, memo} from 'react';
import {View} from 'react-native';

interface IProps {
  x?: number;
  y?: number;
}

const Gap: FC<IProps> = ({x = 12, y = 12}) => {
  return <View style={{height: y, width: x}} />;
};

export default memo(Gap);
