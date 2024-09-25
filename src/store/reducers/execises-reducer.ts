import {Icon} from 'react-native-elements/dist/icons/Icon';
import {ExerciseTypes} from '../costants';
import Icons from '../../assets/icons/svg/index';
import {IExercise, ITag} from '../../types/types';


export interface IFilterExecise {
  id: number;
  title: string;
}
export interface execiseItemList {
  id: number;
  imageUrl: string;
  title: string;
  time: string;
}
export interface IList {
  id: number;
  title: string;
  iconType?: string;
}
export interface IExeciseDetail {
  imageUrl: string;
  title: string;
  description: string;
  list: Array<IList>;
}
export interface IEquipement {
  id: number;
  title: string;
}
export interface IMuscle {
  id: number;
  title: string;
}
export interface IExeciseVideo {
  videoUrl: string;
  title: string;
}
interface IInitialState {
  execiseList: Array<IExercise>;
  execiseFilterList: Array<IFilterExecise>;
  execiseSelectedFilterList: Array<IFilterExecise>;
  execisetDetail: IExercise;
  equipementList: Array<IEquipement>;
  muscleList: Array<IMuscle>;
  tagList: Array<ITag>;
  execiseVideo: IExeciseVideo;
}
export const initialState: IInitialState = {
  execiseList: [],
  execiseSelectedFilterList: [],
  execiseFilterList: [
    {id: 0, title: 'Abs'},
    {id: 1, title: 'Quadriceps'},
    {id: 2, title: 'Chaest'},
    {id: 3, title: 'Back'},
    {id: 4, title: 'Calves'},
    {id: 5, title: 'Forearms'},
    {id: 6, title: 'Triceps'},
    {id: 7, title: 'Shoulders'},
  ],
  execisetDetail: {} as IExercise,
  equipementList: [],
  muscleList: [],
  tagList: [],
  execiseVideo: {
    videoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
    title: 'File Name',
  },
};
const execiseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ExerciseTypes.SET_EXERCISE:
      return {
        ...state,
        execisetDetail: action.payload,
      };
    case ExerciseTypes.SET_EXERCISES:
      return {
        ...state,
        execiseList: action.payload,
      };
    case ExerciseTypes.SET_SELECTED_FILTER:
      return {
        ...state,
        execiseSelectedFilterList: action.payload,
      };
    case ExerciseTypes.SET_EQUIPEMENT:
      return {
        ...state,
        equipementList: action.payload,
      };
    case ExerciseTypes.SET_MUSCLES:
      return {
        ...state,
        muscleList: action.payload,
      };
    case ExerciseTypes.SET_TAGS:
      return {
        ...state,
        tagList: action.payload,
      };
    default:
      return state;
  }
};
export default execiseReducer;
