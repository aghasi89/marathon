import {IWorkout, IFilterWorkout, } from '../reducers/workout-reducer';

export const workoutListSelector = (state: {
  workoutReducer: {workoutList: Array<IWorkout>};
}) => state.workoutReducer.workoutList;
export const workoutFilterListSelector = (state: {
  workoutReducer: {filterList: Array<IFilterWorkout>};
}) => state.workoutReducer.filterList;
export const workoutSelectedFilterListSelector = (state: {
  workoutReducer: {workoutSelectedFilterList: Array<IFilterWorkout>};
}) => state.workoutReducer.workoutSelectedFilterList;
export const workoutDetailSelector = (state: {
  workoutReducer: {workoutDetail: IWorkout};
}) => state.workoutReducer.workoutDetail;
