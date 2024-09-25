import React from 'react';
import {View, ViewStyle} from 'react-native';
import Progress from '../../../../../../components/progress/Progress';
import { ISelectedFeedProgressData } from '../../../../../../types/types';
import styles from './ProgressComponent.style';

type Props = {
data:ISelectedFeedProgressData
  containerStyle?:ViewStyle
};

const ProgressComponent: React.VFC<Props> = ({
  data,
  containerStyle
}) => {
  const sum = (data.carbs??0)+(data.protein??0)+(data.fat??0)
  return (
    <View style={[styles.container,containerStyle]}>
      <Progress title="Calories" percent={data.calories??0} point={'kcal/100g'} />
      <Progress title="Carbs" percent={data.carbs??0/sum} point={'gm'} />
      <Progress title="Protein" percent={data.protein??0/sum} point={'gm'} />
      <Progress title="Fat" percent={data.fat??0/sum} point={'gm'} />
    </View>
  );
};
export default ProgressComponent;
