import {RecipeTypes} from '../costants';
export const setRecipeSelectedFilterList = (payload: any) => {
  return {
    type: RecipeTypes.SET_SELECTED_FILTER,
    payload,
  };
};
