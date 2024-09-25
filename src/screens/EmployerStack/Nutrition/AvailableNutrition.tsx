import React from 'react';
import {ScrollView, View} from 'react-native';
import MealPlan from '../../../components/mealPlan/MealPlan';
import styles from './Nutrition.style';
import FoodCardWithSelect from '../../../components/foodCardWithSelect/FoodCardWithSelect';

export interface IFood {
  id: number;
  title: string;
  image: string;
  portion?:number;
  weight?: number;
  kcal: number;
}
type Props = {
  navigate: () => void;
  foods: Array<IFood>;
  deleteFood: (value) => void;
  caloreis: number;
  title: string;
  isSelected:boolean;
  caloreisIconPress:(value)=>void;
  onCardLeftIconPress:(value)=> void;
  onCheck:()=>void
};
const AvailableNutrition: React.FC<Props> = ({
  navigate,
  foods,
  deleteFood,
  caloreis,
  title,
  isSelected,
  caloreisIconPress,
  onCardLeftIconPress,
  onCheck
}) => {

  return (
    <View style={styles.container}>
      <MealPlan 
      title={title} 
      caloreis={caloreis} 
      onPress={navigate} 
      secondIconExist={true} 
      onPressSecondIcon={caloreisIconPress}
      />
          <ScrollView horizontal={true} style={styles.mealContainer} showsHorizontalScrollIndicator={false}>
          {foods?.map((food: {
            image: string; 
            title: string, 
            portion?:number,
            weight?:number
            kcal:number,
          }, index: number) => {
            return (
              <View key={index} style={styles.mealItem}>
                <FoodCardWithSelect
                  info={ {
                    title:food.title,
                    imageUrl:food.image,
                    portion:food.portion??undefined,
                    weight:food.weight??undefined,
                    kcal:food.kcal,
                  }}
                 leftIconPressNotSelected={deleteFood}
                 leftIconPressSelected={onCardLeftIconPress}
                 isSelected={isSelected}
                 onPressCheck={onCheck}
                />
              </View>
            );
          })}
       </ScrollView>
    </View>
  );
};
export default AvailableNutrition;
