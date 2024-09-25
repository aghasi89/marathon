import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './WeightCard.style';

type Props = {
  weight: string;
  date: string;
  isWeightExist?: boolean;
};
const WeightCard: React.FC<Props> = ({weight, date, isWeightExist}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {isWeightExist ? (
          <Text style={styles.title}>- - - - - - -{'  '}kg</Text>
        ) : (
          <Text style={styles.title}>{weight} kg</Text>
        )}
      </View>
      {isWeightExist && (
        <View style={styles.bottomContainer}>
          <Text style={styles.textKg}>Last weight</Text>
          <Text style={styles.text}>{weight} kg</Text>
          <Text style={styles.textKg}>input {date}</Text>
        </View>
      )}
    </View>
  );
};
export default WeightCard;
