import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icons from '../../../../../assets/icons/svg/index';
import {
  primaryBlack,
  primaryBlue,
} from '../../../../../assets/styles/colors.styles';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import TabNavigationHeader from '../../../../../components/headers/tabNavigationHeader/TabNavigationHeader';
import TabBadges from '../../../../../components/TabBadges/TabBadges';
import MultiSelectSelectedChips from '../../../../../components/multiSelect/MultiSelectSelectedChips';
import BottomBar from '../../../../../components/bottomBar/BottomBar';
import {IFood} from '../../../../../store/reducers/food-reducer';
import {IRecipe} from '../../../../../store/reducers/recipe-reducer';
import {IMeal} from '../../../../../store/reducers/meal-reducer';
import ImportRecipeList from '../../Recipe/ImportRecipeList/ImportRecipeList';
import ImportFoodList from '../../Food/ImportFood/ImportFoodList';
import ImportMealList from '../../Meal/ImportMealList/ImportMealList';
import ImportsHook from './ImportRecipeFoodMeal-hook';
import styles from './ImportRecipeFoodMeal.style';

const chiprGroupItems = [
  {
    title: 'Recipe',
    icon: <Icons.Recipe fill={primaryBlack} />,
    selectedIcon: <Icons.Recipe fill={primaryBlue} />,
  },
  {
    title: 'Food',
    icon: <Icons.Food fill={primaryBlack} />,
    selectedIcon: <Icons.Food fill={primaryBlue} />,
  },
  {
    title: 'Meal',
    icon: <Icons.Meal fill={primaryBlack} />,
    selectedIcon: <Icons.Meal fill={primaryBlue} />,
  },
];

const ImportRecipeFoodMeal: React.FC<any> = ({navigation}) => {
  const {
    badges,
    addFood,
    state,
    checkIsSubmitedFood,
    addRecipe,
    checkIsSubmitedRecipe,
    addMeal,
    checkIsSubmitedMeal,
    selectedData,
    deleteItem,
    index,
    setIndex,
    recipeList,
    foodList,
    mealList,
    isFocus,
    setIsfocus,
    searchText,
    filterText,
    indexTab,
    setIndexTab,
    indexKey,
  } = ImportsHook(navigation);
  const leftIconPress = () => navigation.goBack();

  const renderComponent = () => {
    switch (index) {
      case 0:
        return (
          <ImportRecipeList
            recipeList={recipeList}
            addRecipe={(recipe: IRecipe) => addRecipe(recipe)}
            checkIsSubmited={(id: number) => checkIsSubmitedRecipe(id)}
          />
        );
      case 1:
        return (
          <ImportFoodList
            foodList={foodList}
            addFood={(food: IFood) => addFood(food)}
            checkIsSubmited={(id: number) => checkIsSubmitedFood(id)}
          />
        );
      case 2:
        return (
          <ImportMealList
            mealList={mealList}
            addMeal={(meal: IMeal) => addMeal(meal)}
            checkIsSubmited={(id: number) => checkIsSubmitedMeal(id)}
          />
        );
      default:
    }
  };

  return (
    <View style={styles.container}>
      <MainHeader
        title={
          index === 0
            ? 'Import Recipe'
            : index === 1
            ? 'Import Food'
            : 'Import Meal'
        }
        search={true}
        open={isFocus}
        onFocus={() => setIsfocus(true)}
        onBlur={() => setIsfocus(false)}
        onChangeText={filterText}
        inputValue={searchText}
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FilterNutrition', {index: index});
            }}>
            <Icons.Filter fill={primaryBlack} />
          </TouchableOpacity>
        }
        leftIcon={true}
        leftIconPress={leftIconPress}
      />
      <TabNavigationHeader
        data={chiprGroupItems}
        index={index}
        setIndex={value => {
          setIndex(value);
        }}
      />
      {selectedData.length > 0 ? (
        <View style={styles.item}>
          <MultiSelectSelectedChips
            list={selectedData}
            onDelete={(value: any) => {
              deleteItem(value);
            }}
          />
        </View>
      ) : (
        <TabBadges
          data={badges}
          index={indexTab}
          setIndex={value => {
            setIndexTab(value);
          }}
        />
      )}
      {renderComponent()}
      <BottomBar
        count={
          state.isSubmitedFoods.length +
          state.isSubmitedRecipes.length +
          state.isSubmitedMeals.length
        }
        onImport={() => {
          navigation.navigate('CreateDayPlan', {
            foods: state.isSubmitedFoods,
            recipeList: state.isSubmitedRecipes,
            mealList: state.isSubmitedMeals,
            index: indexKey,
          });
        }}
        onPressMenu={() => {}}
        buttonType={'close'}
      />
    </View>
  );
};
export default ImportRecipeFoodMeal;
