import React from 'react';
import {View} from 'react-native';
import {formFieldGrey} from '../../../../../assets/styles/colors.styles';
import RecentInfoCard from '../../../../../components/recentInfoCard/RecentInfoCard';
import MealPlan from '../../../../../components/mealPlan/MealPlan';
import MealCard from '../../../../../components/mealCard/MealCard';
import styles from './CreateDayPlan.style';
import {IFood} from '../../../../../store/reducers/food-reducer';
import {IRecipe} from '../../../../../store/reducers/recipe-reducer';
import {IMeal, IMeals} from '../../../../../store/reducers/meal-reducer';

type Props = {
  navigate: () => void;
  foods: Array<IFood>;
  repipes: Array<IRecipe>;
  meals: Array<IMeal>;
  deleteFood: (value) => void;
  deleteRecipe: (value) => void;
  deleteMeal: (value) => void;
  selectedText: string;
  valueNumber: string;
  setSelectedText: (value) => void;
  setValueNumber: (value) => void;
  caloreis: number;
  title: string;
};
const SelectedItems: React.FC<Props> = ({
  navigate,
  foods,
  repipes,
  meals,
  deleteFood,
  deleteRecipe,
  deleteMeal,
  selectedText,
  valueNumber,
  setSelectedText,
  setValueNumber,
  caloreis,
  title,
}) => {
  const list = [
    {
      value: '1',
      lable: 'Gram 1',
      image: {
        uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
      },
    },
    {
      value: '2',
      lable: 'Gram 2',
      image: {
        uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
      },
    },
    {
      value: '3',
      lable: 'Gram 3',
      image: {
        uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
      },
    },
    {
      value: '4',
      lable: 'Gram 4',
      image: {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
    },
    {
      value: '5',
      lable: 'Gram 5',
      image: {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
    },
  ];

  return (
    <View style={styles.container}>
      <MealPlan title={title} caloreis={caloreis} onPress={navigate} />
      {(foods.length !== 0 || repipes.length !== 0 || meals.length !== 0) && (
        <View style={styles.mealContainer}>
          {foods.map((food: {image: any; title: any}, index: number) => {
            return (
              <View key={index} style={styles.mealItem}>
                <MealCard
                  imageUrl={food.image}
                  title={food.title}
                  selectedTypesList={list}
                  selectedTypeText={selectedText}
                  setSelectedTypeText={value => {
                    setSelectedText(value);
                  }}
                  valueNumber={valueNumber}
                  onChangeNumberValue={(val: string) => {
                    setValueNumber(val);
                  }}
                  kcalSize={250}
                  kcalSizeStyle={{color: formFieldGrey}}
                  onClose={() => deleteFood(index)}
                />
              </View>
            );
          })}
          {repipes.map((recipe, index) => {
            return (
              <View key={index} style={styles.mealItem}>
                <RecentInfoCard
                  onPress={() => {}}
                  info={{
                    title: recipe.title,
                    imageUrl: recipe.imageUrl,
                    count: recipe.count,
                    amount: recipe.amount,
                    time: recipe.time,
                    saleType: recipe.saleType,
                    type: recipe.type,
                  }}
                  isOnClose={true}
                  onClose={() => deleteRecipe(index)}
                  isDisabled={true}
                />
              </View>
            );
          })}
          {meals.map((meal, index) => {
            return (
              <View key={index} style={styles.mealItem}>
                <RecentInfoCard
                  onPress={() => {}}
                  info={{
                    title: meal.title,
                    imageUrl: meal.imageUrl,
                    //count: meal.count,
                    amount: meal.amount,
                    //time: meal.time,
                    saleType: meal.saleType,
                    type: meal.type,
                  }}
                  isOnClose={true}
                  onClose={() => deleteMeal(index)}
                  isDisabled={true}
                />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};
export default SelectedItems;
