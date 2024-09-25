import {IFilter} from '../../types/types';
import {IMeal, IMealDetail} from '../reducers/meal-reducer';

export const mealListSelector = (state: {
  mealReducer: {mealList: Array<IMeal>};
}) => state.mealReducer.mealList;
export const mealFilterListSelector = (state: {
  mealReducer: {filterList: Array<IFilter>};
}) => state.mealReducer.filterList;
export const mealSelectedFilterListSelector = (state: {
  mealReducer: {mealSelectedFilterList: Array<IFilter>};
}) => state.mealReducer.mealSelectedFilterList;
export const mealDetailSelector = (state: {
  mealReducer: {mealDetail: IMealDetail};
}) => state.mealReducer.mealDetail;
