import { IExercise, ITag } from '../../types/types';
import {WorkoutTypes} from '../costants';
import { IEquipement, IMuscle } from './execises-reducer';
export interface IWorkout {
  id?: number;
  name:string;
  imageUrl: string;
  count: string;
  duration: string,
  exercises: Array<IExercise>,
  rests: Array<any>,
  kcal: string,
  level: string,
  equipents: Array<IEquipement>,
  muscules: Array<IMuscle>,
  tags:Array<ITag>,
  type: string,
}
export interface IFilterWorkout {
  id: number;
  title: string;
}

export interface workoutItemList {
  id: number;
  imageUrl: string;
  title: string;
  time: string;
}
export interface IList {
  id: number;
  title: string;
}
interface IInitialState {
  workoutList: Array<IWorkout>;
  filterList: Array<IFilterWorkout>;
  workoutSelectedFilterList: Array<IFilterWorkout>;
  workoutDetail: IWorkout;
}
export const initialState: IInitialState = {
  workoutList: [],
  workoutSelectedFilterList: [],
  filterList: [
    {id: 0, title: 'Abs'},
    {id: 1, title: 'Quadriceps'},
    {id: 2, title: 'Chaest'},
    {id: 3, title: 'Back'},
    {id: 4, title: 'Calves'},
    {id: 5, title: 'Forearms'},
    {id: 6, title: 'Triceps'},
    {id: 7, title: 'Shoulders'},
  ],
  workoutDetail: {} as IWorkout,
};
const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case WorkoutTypes.SET_SELECTED_FILTER:
      return {
        ...state,
        workoutSelectedFilterList: action.payload,
      };
      case WorkoutTypes.SET_WORKOUTS:
        return {
          ...state,
          workoutList: action.payload,
        };
        case WorkoutTypes.SET_WORKOUT:
          return {
            ...state,
            workoutDetail: action.payload,
          };
    default:
      return state;
  }
};
export default workoutReducer;
