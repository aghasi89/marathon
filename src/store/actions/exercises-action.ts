import { IExercise, ITag } from '../../types/types';
import {ExerciseTypes} from '../costants';
import { IEquipement, IMuscle } from '../reducers/execises-reducer';
export const setExerciseSelectedFilterList = (payload: any) => {
  return {
    type: ExerciseTypes.SET_SELECTED_FILTER,
    payload,
  };
};

export const setEquipements = (payload: Array<IEquipement>) => {
  return {
    type: ExerciseTypes.SET_EQUIPEMENT,
    payload,
  };
};

export const setMuscles = (payload: Array<IMuscle>) => {
  return {
    type: ExerciseTypes.SET_MUSCLES,
    payload,
  };
};
export const setTags = (payload: Array<ITag>) => {
  return {
    type: ExerciseTypes.SET_TAGS,
    payload,
  };
};
export const getExercisesEquipement = () => {
  return {
    type: ExerciseTypes.GET_EQUIPEMENT,
  };
};
export const getExercisesMuscules = () => {
  return {
    type: ExerciseTypes.GET_MUSCULES,
  };
};
export const getExercisesTags = () => {
  return {
    type: ExerciseTypes.GET_TAGS,
  };
};
export const createExercise = (payload: IExercise) => {
  return {
    type: ExerciseTypes.CREATE_EXERCISE,
    payload,
  };
};
export const changeExercise = (payload:{exerciese: IExercise,id:number}) => {
  return {
    type: ExerciseTypes.CHANGE_EXECISE,
    payload,
  };
};
export const setExercises = (payload: Array<IExercise>) => {
  return {
    type: ExerciseTypes.SET_EXERCISES,
    payload,
  };
};
export const getExercises = () => {
  return {
    type: ExerciseTypes.GET_EXERCISES,
  };
};
export const deleteExercise= (payload: number) => {
  return {
    type: ExerciseTypes.DELETE_EXERCISE,
    payload,
  };
};
export const getExerciseById= (payload: number) => {
  return {
    type: ExerciseTypes.GET_EXERCISE_BY_ID,
    payload,
  };
};
export const setExercise= (payload: IExercise) => {
  return {
    type: ExerciseTypes.SET_EXERCISE,
    payload,
  };
};