import {useReducer} from 'react';
import {IDayPlan} from '../../../../store/reducers/dayPlan-reducer';
import {IFood} from '../../../../store/reducers/food-reducer';
import {IMeal} from '../../../../store/reducers/meal-reducer';
import {IRecipe} from '../../../../store/reducers/recipe-reducer';
import {IAction} from '../../../../types/types';

interface IinitialState {
  valueKcal: string;
  carbsValue: string;
  proteinValue: string;
  fatValue: string;
  brackfast: {
    foodList: Array<IFood>;
    recipeList: Array<IRecipe>;
    mealList: Array<IMeal>;
    dayPlanList: Array<IDayPlan>;
  };
  lunch: {
    foodList: Array<IFood>;
    recipeList: Array<IRecipe>;
    mealList: Array<IMeal>;
    dayPlanList: Array<IDayPlan>;
  };
  dinner: {
    foodList: Array<IFood>;
    recipeList: Array<IRecipe>;
    mealList: Array<IMeal>;
    dayPlanList: Array<IDayPlan>;
  };
  snacks: {
    foodList: Array<IFood>;
    recipeList: Array<IRecipe>;
    mealList: Array<IMeal>;
    dayPlanList: Array<IDayPlan>;
  };
}

export default () => {
  const initialState = {
    valueKcal: '0',
    carbsValue: '0',
    proteinValue: '0',
    fatValue: '0',
    brackfast: {
      foodList: [],
      recipeList: [],
      mealList: [],
      dayPlanList: [],
    },
    lunch: {
      foodList: [],
      recipeList: [],
      mealList: [],
      dayPlanList: [],
    },
    dinner: {
      foodList: [],
      recipeList: [],
      mealList: [],
      dayPlanList: [],
    },
    snacks: {
      foodList: [],
      recipeList: [],
      mealList: [],
      dayPlanList: [],
    },
  };

  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_VALUE_KCAL':
        return {...state, valueKcal: action.payload};
      case 'SET_CARBS_VALUE':
        return {...state, carbsValue: action.payload};
      case 'SET_PROTEIN_VALUE':
        return {...state, proteinValue: action.payload};
      case 'SET_FAT_VALUE':
        return {...state, fatValue: action.payload};
      case 'SET_BREAKFAST':
        return {...state, brackfast: action.payload};
      case 'SET_LUNCH':
        return {...state, lunch: action.payload};
      case 'SET_DINNER':
        return {...state, dinner: action.payload};
      case 'SET_SNACKS':
        return {...state, snacks: action.payload};
      default:
        throw new Error();
    }
  }
  const [state, dispatchState] = useReducer(reducer, initialState);
  return {
    state,
    dispatchState,
  };
};
