import {useReducer} from 'react';
import {IFood} from '../../../../../store/reducers/food-reducer';
import {IRecipe} from '../../../../../store/reducers/recipe-reducer';
import {IAction, ITag} from '../../../../../types/types';

interface IinitialState {
  isSubmitedFoods: Array<IFood>;
  isSubmitedRecipes: Array<IRecipe>;
  selectedTags: Array<ITag>;
  typeValue: string;
}

export default () => {
  const initialState = {
    isSubmitedFoods: [],
    isSubmitedRecipes: [],
    selectedTags: [],
    typeValue: '',
  };
  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_ADD_FOOD':
        return {...state, isSubmitedFoods: action.payload};
      case 'SET_ADD_RECIPE':
        return {...state, isSubmitedRecipes: action.payload};
      case 'SET_SELECTED_TAGS':
        return {...state, selectedTags: action.payload};
      case 'SET_TYPE_VALUE':
        return {...state, typeValue: action.payload};
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
