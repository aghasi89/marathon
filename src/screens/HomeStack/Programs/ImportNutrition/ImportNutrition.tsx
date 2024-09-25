import React, {useCallback, useMemo, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Icons from '../../../../assets/icons/svg/index';
import {
  formFieldGrey,
  primaryBlack,
  primaryBlue,
} from '../../../../assets/styles/colors.styles';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import TabNavigationHeader from '../../../../components/headers/tabNavigationHeader/TabNavigationHeader';
import TabBadges from '../../../../components/TabBadges/TabBadges';
import MultiSelectSelectedChips from '../../../../components/multiSelect/MultiSelectSelectedChips';
import BottomBar from '../../../../components/bottomBar/BottomBar';
import MealCard from '../../../../components/mealCard/MealCard';
import {IFood} from '../../../../store/reducers/food-reducer';
import {IRecipe} from '../../../../store/reducers/recipe-reducer';
import {IMeal} from '../../../../store/reducers/meal-reducer';
import {IDayPlan} from '../../../../store/reducers/dayPlan-reducer';
import ImportRecipeList from '../../Nutrition/Recipe/ImportRecipeList/ImportRecipeList';
import ImportFoodList from '../../Nutrition/Food/ImportFood/ImportFoodList';
import ImportMealList from '../../Nutrition/Meal/ImportMealList/ImportMealList';
import ImportDayPlanList from '../../Nutrition/DayPlan/ImportDayPlanList/ImportDayPlanList';
import ImportsHook from './ImportNutrition-hook';
import styles from './ImportNutrition.style';

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
  {
    title: 'Day Plan',
    icon: <Icons.DayPlan fill={primaryBlack} />,
    selectedIcon: <Icons.DayPlan fill={primaryBlue} />,
  },
];
type Props = {navigation: any};
const ImportNutrition: React.FC<Props> = ({navigation}) => {
  const {
    state,
    badges,
    addFood,
    addRecipe,
    addMeal,
    addDayPlan,
    checkIsSubmitedFood,
    checkIsSubmitedRecipe,
    checkIsSubmitedMeal,
    checkIsSubmitedDayPlan,
    recipeList,
    foodList,
    mealList,
    dayPlanList,
    selectedData,
    deleteItem,
    index,
    setIndex,
    isFocus,
    setIsfocus,
    searchText,
    filterText,
    indexTab,
    setIndexTab,
    dayIndex,
    list,
    selectedText,
    setSelectedText,
    valueNumber,
    setValueNumber,
    leftIconPress,
    navigateFilterNutrition,
    count,
    onImortNutrition,
  } = ImportsHook(navigation);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetIndex, setSheetIndex] = useState<number>(0);
  const snapPoints = useMemo(() => ['15%', '50%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

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
      case 3:
        return (
          <ImportDayPlanList
            dayPlanList={dayPlanList}
            addDayPlan={(dayPlan: IDayPlan) => addDayPlan(dayPlan)}
            checkIsSubmited={(id: number) => checkIsSubmitedDayPlan(id)}
          />
        );
      default:
    }
  };

  const BottomBarItem = ({item, onClose}) => {
    return (
      <TouchableOpacity key={index} activeOpacity={0.9} style={styles.submited}>
        <MealCard
          imageUrl={item.imageUrl}
          title={item.title}
          selectedTypesList={list}
          selectedTypeText={selectedText}
          setSelectedTypeText={value => setSelectedText(value)}
          valueNumber={valueNumber}
          onChangeNumberValue={(val: string) => setValueNumber(val)}
          kcalSize={item.amount}
          kcalSizeStyle={{color: formFieldGrey}}
          onClose={onClose}
        />
      </TouchableOpacity>
    );
  };
  const renderBottomBarComponent = () => {
    switch (index) {
      case 0:
        return (
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            {state.submitedNutritions.recipes.map((element, index) => {
              return (
                <BottomBarItem
                  key={index}
                  item={element}
                  onClose={() => {
                    checkIsSubmitedRecipe(element.id);
                    addRecipe(element);
                  }}
                />
              );
            })}
          </BottomSheetScrollView>
        );
      case 1:
        return (
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            {state.submitedNutritions.foods.map((element, index) => {
              return (
                <BottomBarItem
                  key={index}
                  item={element}
                  onClose={() => {
                    checkIsSubmitedFood(element.id);
                    addFood(element);
                  }}
                />
              );
            })}
          </BottomSheetScrollView>
        );
      case 2:
        return (
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            {state.submitedNutritions.meals.map((element, index) => {
              return (
                <BottomBarItem
                  key={index}
                  item={element}
                  onClose={() => {
                    checkIsSubmitedMeal(element.id);
                    addMeal(element);
                  }}
                />
              );
            })}
          </BottomSheetScrollView>
        );
      case 3:
        return (
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            {state.submitedNutritions.dayPlans.map((element, index) => {
              return (
                <BottomBarItem
                  key={index}
                  item={element}
                  onClose={() => {
                    checkIsSubmitedDayPlan(element.id);
                    addDayPlan(element);
                  }}
                />
              );
            })}
          </BottomSheetScrollView>
        );
      default:
    }
  };
  return (
    <View style={styles.container}>
      <MainHeader
        title={'Add Nutrition'}
        search={true}
        open={isFocus}
        onFocus={() => setIsfocus(true)}
        onBlur={() => setIsfocus(false)}
        onChangeText={filterText}
        inputValue={searchText}
        leftComponent={
          <TouchableOpacity onPress={navigateFilterNutrition}>
            <Icons.Filter fill={primaryBlack} />
          </TouchableOpacity>
        }
        leftIcon={true}
        leftIconPress={leftIconPress}
      />
      <TabNavigationHeader
        data={chiprGroupItems}
        index={index}
        setIndex={setIndex}
      />
      {selectedData.length > 0 ? (
        <View style={styles.item}>
          <MultiSelectSelectedChips list={selectedData} onDelete={deleteItem} />
        </View>
      ) : (
        <TabBadges data={badges} index={indexTab} setIndex={setIndexTab} />
      )}
      {renderComponent()}
      <BottomSheet
        ref={bottomSheetRef}
        index={sheetIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.listContainer}>
          <BottomBar
            count={count}
            onImport={onImortNutrition}
            onPressMenu={() => handleSheetChanges(sheetIndex ? 0 : 1)}
            buttonType={sheetIndex ? 'close' : 'menu'}
            isAddToDay
            dayIndex={dayIndex + 1}
          />
          {renderBottomBarComponent()}
        </View>
      </BottomSheet>
    </View>
  );
};
export default ImportNutrition;
