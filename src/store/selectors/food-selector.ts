import { IAmount, ICategory, IFilter, IFood, ITag } from '../../types/types';

export const foodListSelector = (state: {
  foodReducer: { foodList: Array<IFood> };
}) => state.foodReducer.foodList;
export const foodFilterListSelector = (state: {
  foodReducer: { filterList: Array<IFilter> };
}) => state.foodReducer.filterList;
export const foodSelectedFilterListSelector = (state: {
  foodReducer: { foodSelectedFilterList: Array<IFilter> };
}) => state.foodReducer.foodSelectedFilterList;
export const selectedFoodItemSelector = (state: {
  foodReducer: { selectedFoodItem: IFood };
}) => state.foodReducer.selectedFoodItem;
export const foodsCategoriesSelector = (state: {
  foodReducer: { foodsCategories: Array<ICategory> };
}) => state.foodReducer.foodsCategories;
export const foodsTagsSelector = (state: {
  foodReducer: { foodsTags: Array<ITag> };
}) => state.foodReducer.foodsTags;
export const foodsAmountsSelector = (state: {
  foodReducer: { foodsAmounts: Array<IAmount> };
}) => state.foodReducer.foodsAmounts;

