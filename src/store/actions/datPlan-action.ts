import {DayPlanTypes} from '../costants';
export const setDayPlanSelectedFilterList = (payload: any) => {
  return {
    type: DayPlanTypes.SET_SELECTED_FILTER,
    payload,
  };
};
