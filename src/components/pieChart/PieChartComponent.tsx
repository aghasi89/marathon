import React from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {green, primaryWhite} from '../../assets/styles/colors.styles';
import {styles} from './PieChartComponent.style';
type Props = {
  title: string;
  percent: number;
  weight: number;
};
const PieChartComponent: React.FC<Props> = ({title, percent, weight}) => {
  const data = [percent, 100 - percent];

  const pieData = data
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: index === 0 ? green : primaryWhite,
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
    }));
  return (
    <View style={styles.container}>
      <View style={styles.circleStyle}>
        <PieChart
          innerRadius={'1%'}
          startAngle={270}
          style={styles.pieChart}
          data={pieData}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.percentText}>{percent} % </Text>
          <Text style={styles.percentText}> {weight} g</Text>
        </View>
      </View>
    </View>
  );
};
export default PieChartComponent;
