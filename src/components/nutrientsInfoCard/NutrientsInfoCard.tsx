import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import styles from './NutrientsInfoCard-style';

type Props = {
  date: string;
  calories: string;
  carbs: string;
  protein: string;
  fat: string;
  containerStyle?: ViewStyle;
};

const NutrientsInfoCard: React.FC<Props> = ({
  date,
  calories,
  carbs,
  protein,
  fat,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Text style={styles.text}> {date}</Text>
        <Text style={styles.text}> {calories}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.labelAndTextContainer}>
          <Text style={styles.lable}> Carbs</Text>
          <Text style={styles.text}> {carbs}</Text>
        </View>
        <View style={styles.labelAndTextContainer}>
          <Text style={styles.lable}>Protein</Text>
          <Text style={styles.text}>{protein}</Text>
        </View>
        <View style={styles.labelAndTextContainer}>
          <Text style={styles.lable}>Fats</Text>
          <Text style={styles.text}>{fat}</Text>
        </View>
      </View>
    </View>
  );
};

export default NutrientsInfoCard;
