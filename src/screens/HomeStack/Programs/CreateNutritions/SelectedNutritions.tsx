import React from 'react';
import {View} from 'react-native';
import MealPlan from '../../../../components/mealPlan/MealPlan';
import MealCard from '../../../../components/mealCard/MealCard';
import {IFood} from '../../../../store/reducers/food-reducer';
import {IRecipe} from '../../../../store/reducers/recipe-reducer';
import {IMeal} from '../../../../store/reducers/meal-reducer';
import {IDayPlan} from '../../../../store/reducers/dayPlan-reducer';
import styles from './CreateNutritions.style';

type Props = {
  navigate: () => void;
  foods: Array<IFood>;
  recipes: Array<IRecipe>;
  meals: Array<IMeal>;
  dayPlans: Array<IDayPlan>;
  deleteFood: (value) => void;
  deleteRecipe: (value) => void;
  deleteMeal: (value) => void;
  deleteDayPlan: (value) => void;
  selectedText: string;
  valueNumber: string;
  setSelectedText: (value) => void;
  setValueNumber: (value) => void;
  caloreis: number;
  title: string;
};
const SelectedNutritions: React.FC<Props> = ({
  navigate,
  foods,
  recipes,
  meals,
  dayPlans,
  deleteFood,
  deleteRecipe,
  deleteMeal,
  deleteDayPlan,
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
  const lengths = () => {
    return (
      foods.length !== 0 ||
      recipes.length !== 0 ||
      meals.length !== 0 ||
      dayPlans.length !== 0
    );
  };

  return (
    <View style={styles.container}>
      <MealPlan title={title} caloreis={caloreis} onPress={navigate} />
      {lengths() && (
        <View style={styles.mealContainer}>
          {foods?.map((food: {image: string; title: string}, index: number) => {
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
                  kcalSizeStyle={styles.kcalSizeStyle}
                  onClose={() => deleteFood(index)}
                />
              </View>
            );
          })}
          {recipes?.map((recipe, index) => {
            return (
              <View key={index} style={styles.mealItem}>
                <MealCard
                  imageUrl={recipe.imageUrl}
                  title={recipe.title}
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
                  kcalSizeStyle={styles.kcalSizeStyle}
                  onClose={() => deleteRecipe(index)}
                />
              </View>
            );
          })}
          {meals?.map((meal, index) => {
            return (
              <View key={index} style={styles.mealItem}>
                <MealCard
                  imageUrl={meal.imageUrl}
                  title={meal.title}
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
                  kcalSizeStyle={styles.kcalSizeStyle}
                  onClose={() => deleteMeal(index)}
                />
              </View>
            );
          })}
          {dayPlans?.map((dayPlan, index) => {
            return (
              <View key={index} style={styles.mealItem}>
                <MealCard
                  imageUrl={dayPlan.imageUrl}
                  title={dayPlan.title}
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
                  kcalSizeStyle={styles.kcalSizeStyle}
                  onClose={() => deleteDayPlan(index)}
                />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};
export default SelectedNutritions;
