import React from 'react';
import {ScrollView, ViewStyle} from 'react-native';
import NutrientsInfoCard from '../nutrientsInfoCard/NutrientsInfoCard';
import styles from './NutrientsInfoCardList-style';

export type NutrientsInfoCardData = {
  date: string;
  calories: string;
  carbs: string;
  protein: string;
  fat: string;
};
type Props = {
  data: Array<NutrientsInfoCardData>;
  cardItemContanerStyle?: ViewStyle;
};

const NutrientsInfoCardList: React.FC<Props> = ({
  data,
  cardItemContanerStyle,
}) => {
  return (
    <ScrollView style={styles.infoListContainer}>
      {data.map((item, index) => {
        return (
          <NutrientsInfoCard
            calories={item.calories}
            carbs={item.carbs}
            date={item.date}
            fat={item.fat}
            protein={item.protein}
            containerStyle={cardItemContanerStyle}
            key={index}
          />
        );
      })}
    </ScrollView>
  );
};
export default NutrientsInfoCardList;