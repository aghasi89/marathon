import {useReducer} from 'react';
import {IFood} from '../../../../../store/reducers/food-reducer';
import {IList} from '../../../../../store/reducers/meal-reducer';
import {IRecipe} from '../../../../../store/reducers/recipe-reducer';
import {IAction, ITag} from '../../../../../types/types';

interface IinitialState {
  mealImageUrl: string;
  mealName: string;
  valueKcal: string;
  selectedItems: Array<IList>;
  carbsValue: string;
  proteinValue: string;
  fatValue: string;
  selectedTags: Array<ITag>;
  typeValue: string;
  foods: Array<IFood>;
  recipeList: Array<IRecipe>;
}

export default () => {
  const listForMultiSelect = [
    {id: 0, title: 'Gram'},
    {id: 1, title: 'Percent'},
  ];
  const initialState = {
    mealImageUrl: '',
    mealName: '',
    valueKcal: '0',
    selectedItems: [listForMultiSelect[0]],
    carbsValue: '0',
    proteinValue: '0',
    fatValue: '0',
    selectedTags: [],
    typeValue: '',
    foods: [],
    recipeList: [],
  };

  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_MEAL_IMAGE_URL':
        return {...state, mealImageUrl: action.payload};
      case 'SET_MEAL_NAME':
        return {...state, mealName: action.payload};
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
      case 'SET_FOODS':
        return {...state, foods: action.payload};
      case 'SET_RECIPE_LIST':
        return {...state, recipeList: action.payload};
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
