import React from 'react';
import {ScrollView, View} from 'react-native';
import styles from './ImportFood.style';
import FoodCard from '../../../../../components/foodCard/FoodCard';
import {IFood} from '../../../../../store/reducers/food-reducer';

const ImportFoodList: React.FC<any> = props => {
  return (
    <ScrollView style={styles.container}>
      {props.foodList.map((food: IFood, index: number) => {
        return (
          <View key={index}>
            <FoodCard
              title={food.title}
              image={food.image}
              weight={food.weight}
              kcal={food.kcal}
              isDisabled={false}
              isSubmited={props.checkIsSubmited(food.id)}
              onPress={() => props.addFood(food)}
              onPressCheck={() => props.addFood(food)}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};
export default ImportFoodList;
