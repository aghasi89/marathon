import React from 'react';
import {View, Text} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';
import {backgroundGreen, lightGreen} from '../../assets/styles/colors.styles';
import {styles} from './WorkoutDetail.styles';
type Props = {
  title: string;
  time: string;
};
const WorkoutDetailComp: React.FC<Props> = ({title, time}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{time}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
export default WorkoutDetailComp;
