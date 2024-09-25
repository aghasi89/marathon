import {ProgramTypes} from '../costants';
export const setSelectedFilterList = (payload: any) => {
  return {
    type: ProgramTypes.SET_SELECTED_FILTER,
    payload,
  };
};
export const setSelectedTag = (payload: any) => {
  return {
    type: ProgramTypes.SET_SELECTED_TAGS,
    payload,
  };
};
export const setDays = (payload: any) => {
  return {
    type: ProgramTypes.SET_DAY,
    payload,
  };
};
