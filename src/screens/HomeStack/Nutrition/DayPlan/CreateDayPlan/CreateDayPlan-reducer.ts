import {useReducer} from 'react';
import {IFood} from '../../../../../store/reducers/food-reducer';
import {IMeal} from '../../../../../store/reducers/meal-reducer';
import {IList, IRecipe} from '../../../../../store/reducers/recipe-reducer';
import {IAction, ITag} from '../../../../../types/types';

interface IinitialState {
  dayPlanImageUrl: string;
  dayPlanName: string;
  valueKcal: string;
  selectedItems: Array<IList>;
  carbsValue: string;
  proteinValue: string;
  fatValue: string;
  selectedTags: Array<ITag>;
  typeValue: string;
  brackfast: {
    foods: Array<IFood>;
    recipeList: Array<IRecipe>;
    mealList: Array<IMeal>;
  };
  lunch: {
    foods: Array<IFood>;
    recipeList: Array<IRecipe>;
    mealList: Array<IMeal>;
  };
  dinner: {
    foods: Array<IFood>;
    recipeList: Array<IRecipe>;
    mealList: Array<IMeal>;
  };
  snacks: {
    foods: Array<IFood>;
    recipeList: Array<IRecipe>;
    mealList: Array<IMeal>;
  };
}

export default () => {
  const listForMultiSelect = [
    {id: 0, title: 'Gram'},
    {id: 1, title: 'Percent'},
  ];
  const initialState = {
    dayPlanImageUrl: '',
    dayPlanName: '',
    valueKcal: '0',
    selectedItems: [listForMultiSelect[0]],
    carbsValue: '0',
    proteinValue: '0',
    fatValue: '0',
    selectedCategories: [],
    selectedTags: [],
    typeValue: '',
    brackfast: {
      foods: [],
      recipeList: [],
      mealList: [],
    },
    lunch: {
      foods: [],
      recipeList: [],
      mealList: [],
    },
    dinner: {
      foods: [],
      recipeList: [],
      mealList: [],
    },
    snacks: {
      foods: [],
      recipeList: [],
      mealList: [],
    },
  };

  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_DAY_PLAN_IMAGE_URL':
        return {...state, dayPlanImageUrl: action.payload};
      case 'SET_DAY_PLAN_NAME':
        return {...state, dayPlanName: action.payload};
      case 'SET_VALUE_KCAL':
        return {...state, valueKcal: action.payload};
      case 'SET_SELECTED_ITEMS':
        return {...state, selectedItems: action.payload};
      case 'SET_CARBS_VALUE':
        return {...state, carbsValue: action.payload};
      case 'SET_PROTEIN_VALUE':
        return {...state, proteinValue: action.payload};
      case 'SET_FAT_VALUE':
        return {...state, fatValue: action.payload};
      case 'SET_SELECTED_TAGS':
        return {...state, selectedTags: action.payload};
      case 'SET_TYPE_VALUE':
        return {...state, typeValue: action.payload};
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
