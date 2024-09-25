import {useRoute, useNavigation} from '@react-navigation/native';
import {useEffect, useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {programDaySelector} from '../../../../store/selectors/programs-selector';
import CreateNutritionsReducer from './CreateNutritions-reducer';

export default props => {
  const {state, dispatchState} = CreateNutritionsReducer();
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>('1');
  const [valueNumber, setValueNumber] = useState<string>('');
  const days = useSelector(programDaySelector);

  const route = useRoute<any>();
  const foodList = route.params?.foodList ?? [];
  const recipeList = route.params?.recipeList ?? [];
  const mealList = route.params?.mealList ?? [];
  const dayPlanList = route.params?.dayPlanList ?? [];
  const dayIndex = route.params?.dayIndex ?? null;
  const mealIndex = route.params?.mealIndex ?? null;

  const payload = {
    mealList: mealList,
    foodList: foodList,
    recipeList: recipeList,
    dayPlanList: dayPlanList,
  };

  const setNutrition = () => {
    switch (mealIndex) {
      case 0:
        dispatchState({
          type: 'SET_BREAKFAST',
          payload: payload,
        });
        break;
      case 1:
        dispatchState({
          type: 'SET_LUNCH',
          payload: payload,
        });
        break;
      case 2:
        dispatchState({
          type: 'SET_DINNER',
          payload: payload,
        });
        break;
      case 3:
        dispatchState({
          type: 'SET_SNACKS',
          payload: payload,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (
      mealList.length > 0 ||
      recipeList.length > 0 ||
      foodList.length > 0 ||
      dayPlanList.length > 0
    ) {
      setNutrition();
    }
  }, [mealIndex]);

  const deleteFood = (index: number, keyIndex: number) => {
    switch (keyIndex) {
      case 0:
        let list = [...state.brackfast.foodList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_BREAKFAST',
          payload: {...state.brackfast, foodList: list},
        });
        break;
      case 1:
        list = [...state.lunch.foodList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_LUNCH',
          payload: {...state.lunch, foodList: list},
        });
        break;
      case 2:
        list = [...state.dinner.foodList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_DINNER',
          payload: {...state.dinner, foodList: list},
        });
        break;
      default:
        list = [...state.snacks.foodList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_SNACKS',
          payload: {...state.snacks, foodList: list},
        });
        break;
    }
  };
  const deleteRecipe = (index: number, keyIndex: number) => {
    switch (keyIndex) {
      case 0:
        let list = [...state.brackfast.recipeList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_BREAKFAST',
          payload: {...state.brackfast, recipeList: list},
        });
        break;
      case 1:
        list = [...state.lunch.recipeList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_LUNCH',
          payload: {...state.lunch, recipeList: list},
        });
        break;
      case 2:
        list = [...state.dinner.recipeList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_DINNER',
          payload: {...state.dinner, recipeList: list},
        });
        break;
      default:
        list = [...state.snacks.recipeList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_SNACKS',
          payload: {...state.snacks, recipeList: list},
        });
        break;
    }
  };
  const deleteMeal = (index: number, keyIndex: number) => {
    switch (keyIndex) {
      case 0:
        let list = [...state.brackfast.mealList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_BREAKFAST',
          payload: {...state.brackfast, mealList: list},
        });
        break;
      case 1:
        list = [...state.lunch.mealList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_LUNCH',
          payload: {...state.lunch, mealList: list},
        });
        break;
      case 2:
        list = [...state.dinner.mealList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_DINNER',
          payload: {...state.dinner, mealList: list},
        });
        break;
      default:
        list = [...state.snacks.mealList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_SNACKS',
          payload: {...state.snacks, mealList: list},
        });
        break;
    }
  };
  const deleteDayPlan = (index: number, keyIndex: number) => {
    switch (keyIndex) {
      case 0:
        let list = [...state.brackfast.dayPlanList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_BREAKFAST',
          payload: {...state.brackfast, dayPlanList: list},
        });
        break;
      case 1:
        list = [...state.lunch.dayPlanList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_LUNCH',
          payload: {...state.lunch, dayPlanList: list},
        });
        break;
      case 2:
        list = [...state.dinner.dayPlanList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_DINNER',
          payload: {...state.dinner, dayPlanList: list},
        });
        break;
      default:
        list = [...state.snacks.dayPlanList];
        list.splice(index, 1);
        dispatchState({
          type: 'SET_SNACKS',
          payload: {...state.snacks, dayPlanList: list},
        });
        break;
    }
  };

  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navigateNutrition = useCallback(
    (index: number) => {
      navigation.navigate('ImportNutrition', {
        mealIndex: index,
        dayIndex: dayIndex,
      });
    },
    [navigation],
  );

  return {
    state,
    isOpen,
    setIsOpen,
    deleteFood,
    deleteMeal,
    deleteRecipe,
    deleteDayPlan,
    selectedText,
    setSelectedText,
    valueNumber,
    setValueNumber,
    days,
    dayIndex,
    leftIconPress,
    navigateNutrition,
  };
};
