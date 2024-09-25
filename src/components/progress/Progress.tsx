import React from 'react';
import {View, Text} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';
import {backgroundGreen, lightGreen} from '../../assets/styles/colors.styles';
import {styles} from './Progress.styles';
type Props = {
  title: string;
  percent: number;
  point: string;
};
const Progress: React.FC<Props> = ({title, percent, point}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.circleStyle}>
        <ProgressCircle
          style={styles.progressStyle}
          progress={percent / 100}
          progressColor={lightGreen}
          backgroundColor={backgroundGreen}
          strokeWidth={4}>
           <View style = {styles.progressCircleChild}> 
            <Text style={styles.percentText}>{percent}</Text>
          </View>
        </ProgressCircle>
      </View>
      <Text style={styles.bootomTexr}>{point}</Text>
    </View>
  );
};
export default Progress;
