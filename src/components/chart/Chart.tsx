import React from 'react';
import {Text, View} from 'react-native';
import styles from './Chart.style';

type Props = {
  barColor:string
  date:string,
  percent:number,
  title:string,
};

const Chart: React.FC<Props> = (props) => {
  const {barColor,title,date,percent}=props
  return (
        <View style={styles.chartsItemContainer}>
          <View style={styles.chartContainer}>
              <View style={[styles.chartInner,{backgroundColor:barColor, height:`${percent<=98?percent:98}%`}]}></View>
          </View>
          <View style={styles.ValueContainer}>
            <Text style={styles.valueText}>
              {title}
              </Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{date}</Text>
          </View>
        </View>
 );
};
export default Chart;
