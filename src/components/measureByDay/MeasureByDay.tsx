import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import styles from './MeasureByDay.style';

const MeasureByDay: React.FC<any> = ({days}) => {
  return (
    <ScrollView style={styles.bottomPart} showsVerticalScrollIndicator={false}>
      {days.map((day, index) => {
        return (
          <View key={index} style={styles.dayMeasureContainer}>
            <View style={styles.dayMeasure}>
              <Text style={styles.labelStyle}>{day.date}</Text>
              {day.bodyParts.map((item, index) => {
                return (
                  <View key={index} style={styles.bottomPartItem}>
                    <Text style={styles.labelStyle}>{item.name}</Text>
                    <Text style={styles.labelStyle}>{item.measure} cm</Text>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default MeasureByDay;
