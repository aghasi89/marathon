import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Check from '../check/Check';
import styles from './FoodCard.style';
type Props = {
  title: string;
  image?: string;
  weight: string;
  kcal: number;
  isDisabled: boolean;
  isSubmited?: boolean;
  onPress?: () => void;
  onPressCheck?: () => void;
};
const FoodCard: React.FC<Props> = ({
  title,
  image,
  weight,
  kcal,
  isDisabled,
  isSubmited,
  onPress,
  onPressCheck,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress && onPress();
      }}>
      <View>
        <Text style={styles.textTitle}>{title}</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.textWeight}>{weight}</Text>
          <Text style={styles.textKCal}>{kcal} kcal</Text>
        </View>
      </View>
      {image && (
        <ImageBackground
          source={{ uri: image }}
          resizeMode="contain"
          style={styles.image}
        />
      )}
      <View style={styles.check}>
        {!isDisabled && (
          <Check
            isSubmited={isSubmited}
            onPress={() => {
              onPressCheck && onPressCheck();
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
export default FoodCard;
