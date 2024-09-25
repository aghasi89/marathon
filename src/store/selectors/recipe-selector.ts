import {IFilter} from '../../types/types';
import {IRecipe, IRecipeDetail} from '../reducers/recipe-reducer';

export const recipeListSelector = (state: {
  recipeReducer: {recipeList: Array<IRecipe>};
}) => state.recipeReducer.recipeList;
export const recipeFilterListSelector = (state: {
  recipeReducer: {filterList: Array<IFilter>};
}) => state.recipeReducer.filterList;
export const recipeSelectedFilterListSelector = (state: {
  recipeReducer: {recipeSelectedFilterList: Array<IFilter>};
}) => state.recipeReducer.recipeSelectedFilterList;
export const recipeDetailSelector = (state: {
  recipeReducer: {recipeDetail: IRecipeDetail};
}) => state.recipeReducer.recipeDetail;
