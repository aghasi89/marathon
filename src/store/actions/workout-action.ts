import {WorkoutTypes} from '../costants';
import { IWorkout } from '../reducers/workout-reducer';
export const setWorkoutSelectedFilterList = (payload: any) => {
  return {
    type: WorkoutTypes.SET_SELECTED_FILTER,
    payload,
  };
};
export const createWorkout = (payload: IWorkout) => {
  return {
    type: WorkoutTypes.CREATE_WORKOUT,
    payload,
  };
};
export const changeWorkout = (payload:{workout: IWorkout,id:number}) => {
  return {
    type: WorkoutTypes.CHANGE_WORKOUT,
    payload,
  };
};
export const setWorkouts = (payload: Array<IWorkout>) => {
  return {
    type: WorkoutTypes.SET_WORKOUTS,
    payload,
  };
};
export const getWorkouts = () => {
  return {
    type: WorkoutTypes.GET_WORKOUTS,
  };
};
export const deleteWorkout= (payload: number) => {
  return {
    type: WorkoutTypes.DELETE_WORKOUT,
    payload,
  };
};
export const getWorkoutById= (payload: number) => {
  return {
    type: WorkoutTypes.GET_WORKOUT_BY_ID,
    payload,
  };
};
export const setWorkout= (payload: IWorkout) => {
  return {
    type: WorkoutTypes.SET_WORKOUT,
    payload,
  };
};