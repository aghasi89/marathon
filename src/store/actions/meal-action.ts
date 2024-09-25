import { MealTypes} from '../costants';
export const setMealSelectedFilterList = (payload: any) => {
  return {
    type: MealTypes.SET_SELECTED_FILTER,
    payload,
  };
};