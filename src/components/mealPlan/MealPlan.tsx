import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icons from '../../assets/icons/svg/index';
import {formFieldGrey} from '../../assets/styles/colors.styles';
import styles from './MealPlan.style';

interface IMealPlan {
  caloreis: number;
  time?: string;
  title: string;
  onPress: () => void;
  onPressSecondIcon?: (value) => void;
  secondIconExist?:boolean;
}

export default function MealPlan(props: IMealPlan) {
  const {caloreis, time, title, onPress,secondIconExist,onPressSecondIcon} = props;
  return (
    <View style={styles.dropContainer}>
      <Text style={styles.title}>{title}</Text>
      {time && <Text>{time} min</Text>}
      <Text>{caloreis} kcal</Text>
   { !secondIconExist?(
      <TouchableOpacity style={styles.icon} onPress={onPress}>
        <Icons.Plus fill={formFieldGrey} />
      </TouchableOpacity>):(
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.icons} onPress={onPress}>
          <Icons.Plus fill={formFieldGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icons} onPress={onPressSecondIcon}>
          <Icons.Calories fill={formFieldGrey} />
        </TouchableOpacity>
     </View>
      )}
    </View>
  );
}
