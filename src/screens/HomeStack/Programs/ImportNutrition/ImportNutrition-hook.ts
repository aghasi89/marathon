import {useRoute, useNavigation} from '@react-navigation/native';
import {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setFoodSelectedFilterList} from '../../../../store/actions/food-action';
import {setMealSelectedFilterList} from '../../../../store/actions/meal-action';
import {setRecipeSelectedFilterList} from '../../../../store/actions/recipe-action';
import {setDayPlanSelectedFilterList} from '../../../../store/actions/datPlan-action';
import {IFood} from '../../../../store/reducers/food-reducer';
import {IMeal} from '../../../../store/reducers/meal-reducer';
import {IRecipe} from '../../../../store/reducers/recipe-reducer';
import {IDayPlan} from '../../../../store/reducers/dayPlan-reducer';
import {
  foodListSelector,
  foodSelectedFilterListSelector,
} from '../../../../store/selectors/food-selector';
import {
  mealListSelector,
  mealSelectedFilterListSelector,
} from '../../../../store/selectors/meal-selector';
import {
  recipeListSelector,
  recipeSelectedFilterListSelector,
} from '../../../../store/selectors/recipe-selector';
import {
  dayPlanListSelector,
  dayPlanSelectedFilterListSelector,
} from '../../../../store/selectors/dayPlan-selector';
import {programDaySelector} from '../../../../store/selectors/programs-selector';
import {setDays} from '../../../../store/actions/program-action';
import ImportNutrition from './ImportNutrition-reducer';
import {IFilter} from '../../../../types/types';

export default props => {
  const {state, dispatchState} = ImportNutrition();
  const [isFocus, setIsfocus] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();
  const [index, setIndex] = useState<number>(0);
  const [indexTab, setIndexTab] = useState<number>(0);
  const [selectedData, setSelectedData] = useState<Array<IFilter>>([]);
  const [selectedText, setSelectedText] = useState<string>('1');
  const [valueNumber, setValueNumber] = useState<string>('');
  const days = useSelector(programDaySelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const dayIndex = route.params?.dayIndex ?? null;
  const mealIndex = route.params?.mealIndex ?? null;
  const badges = [
    {
      title: 'Recent',
    },
    {
      title: 'Library',
    },
    {
      title: 'Bookmarks',
    },
  ];

  const checkIsSubmitedFood = (id: number) => {
    for (let i = 0; i < state.submitedNutritions.foods.length; i++) {
      const submitedFood = state.submitedNutritions.foods[i];
      if (submitedFood.id == id) {
        return true;
      }
    }
    return false;
  };
  const checkIsSubmitedRecipe = (id: number) => {
    for (let i = 0; i < state.submitedNutritions.recipes.length; i++) {
      const submitedRecipe = state.submitedNutritions.recipes[i];
      if (submitedRecipe.id == id) {
        return true;
      }
    }
    return false;
  };

  const checkIsSubmitedMeal = (id: number) => {
    for (let i = 0; i < state.submitedNutritions.meals.length; i++) {
      const submitedMeal = state.submitedNutritions.meals[i];
      if (submitedMeal.id == id) {
        return true;
      }
    }
    return false;
  };
  const checkIsSubmitedDayPlan = (id: number) => {
    for (let i = 0; i < state.submitedNutritions.dayPlans.length; i++) {
      const submitedDayPlan = state.submitedNutritions.dayPlans[i];
      if (submitedDayPlan.id == id) {
        return true;
      }
    }
    return false;
  };
  const addFood = (food: IFood) => {
    if (!checkIsSubmitedFood(food.id)) {
      dispatchState({
        type: 'SET_ADD_FOOD',
        payload: [...state.submitedNutritions.foods, food],
      });
    } else {
      let array = [...state.submitedNutritions.foods];
      const findIndex = array.findIndex(element => {
        return element.id == food.id;
      });
      array.splice(findIndex, 1);
      dispatchState({type: 'SET_ADD_FOOD', payload: array});
    }
  };

  const addRecipe = (recipe: IRecipe) => {
    if (!checkIsSubmitedRecipe(recipe.id)) {
      dispatchState({
        type: 'SET_ADD_RECIPE',
        payload: [...state.submitedNutritions.recipes, recipe],
      });
    } else {
      let array = [...state.submitedNutritions.recipes];
      const findIndex = array.findIndex(element => {
        return element.id == recipe.id;
      });
      array.splice(findIndex, 1);
      dispatchState({
        type: 'SET_ADD_RECIPE',
        payload: array,
      });
    }
  };
  const addMeal = (meal: IMeal) => {
    if (!checkIsSubmitedMeal(meal.id)) {
      dispatchState({
        type: 'SET_ADD_MEAL',
        payload: [...state.submitedNutritions.meals, meal],
      });
    } else {
      let array = [...state.submitedNutritions.meals];
      const findIndex = array.findIndex(element => {
        return element.id == meal.id;
      });
      array.splice(findIndex, 1);
      dispatchState({
        type: 'SET_ADD_MEAL',
        payload: array,
      });
    }
  };
  const addDayPlan = (dayPlan: IDayPlan) => {
    if (!checkIsSubmitedDayPlan(dayPlan.id)) {
      dispatchState({
        type: 'SET_ADD_DAYPLAN',
        payload: [...state.submitedNutritions.dayPlans, dayPlan],
      });
    } else {
      let array = [...state.submitedNutritions.dayPlans];
      const findIndex = array.findIndex(element => {
        return element.id == dayPlan.id;
      });
      array.splice(findIndex, 1);
      dispatchState({
        type: 'SET_ADD_DAYPLAN',
        payload: array,
      });
    }
  };

  const filterText = text => {
    setSearchText(text);
  };

  const foodList = useSelector(foodListSelector);
  const recipeList = useSelector(recipeListSelector);
  const mealList = useSelector(mealListSelector);
  const dayPlanList = useSelector(dayPlanListSelector);

  const recipeSelectedFilterList = useSelector(
    recipeSelectedFilterListSelector,
  );
  const foodSelectedFilterList = useSelector(foodSelectedFilterListSelector);
  const mealSelectedFilterList = useSelector(mealSelectedFilterListSelector);
  const dayPlanSelectedFilterList = useSelector(
    dayPlanSelectedFilterListSelector,
  );

  const selectedFilterList: any = () => {
    switch (index) {
      case 0:
        return recipeSelectedFilterList;
      case 1:
        return foodSelectedFilterList;
      case 2:
        return mealSelectedFilterList;
      case 3:
        return dayPlanSelectedFilterList;
      default:
        break;
    }
  };
  useEffect(() => {
    setSelectedData(selectedFilterList());
  }, [index, selectedFilterList]);

  const deleteItem = (value: any) => {
    for (let i = 0; i < selectedData.length; i++) {
      if (selectedData[i].id === value.id) {
        let list = [...selectedData];
        list.splice(i, 1);
        switch (index) {
          case 0:
            dispatch(setRecipeSelectedFilterList(list));
            break;
          case 1:
            dispatch(setFoodSelectedFilterList(list));
            break;
          case 2:
            dispatch(setMealSelectedFilterList(list));
            break;
          case 3:
            dispatch(setDayPlanSelectedFilterList(list));
            break;
          default:
            break;
        }
      }
    }
  };
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
  const importNutritions = () => {
    let array = [...days];
    array[dayIndex].nutritions = [
      ...array[dayIndex].nutritions,
      state.submitedNutritions,
    ];
    dispatch(setDays(array));
  };

  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navigateFilterNutrition = useCallback(() => {
    navigation.navigate('FilterNutrition', {index: index});
  }, [navigation, index]);

  const count =
    state.submitedNutritions.foods.length +
    state.submitedNutritions.recipes.length +
    state.submitedNutritions.meals.length +
    state.submitedNutritions.dayPlans.length;

  const onImortNutrition = () => {
    importNutritions();
    navigation.navigate('CreateNutritions', {
      foodList: state.submitedNutritions.foods,
      recipeList: state.submitedNutritions.recipes,
      mealList: state.submitedNutritions.meals,
      dayPlanList: state.submitedNutritions.dayPlans,
      dayIndex: dayIndex,
      mealIndex: mealIndex,
    });
  };

  return {
    badges,
    addFood,
    addRecipe,
    addMeal,
    addDayPlan,
    state,
    checkIsSubmitedFood,
    checkIsSubmitedRecipe,
    checkIsSubmitedMeal,
    checkIsSubmitedDayPlan,
    selectedData,
    deleteItem,
    index,
    setIndex,
    recipeList,
    foodList,
    mealList,
    dayPlanList,
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
    importNutritions,
    mealIndex,
    leftIconPress,
    navigateFilterNutrition,
    count,
    onImortNutrition,
  };
};
