import { useReducer } from 'react';
import {
  IEquipement,
  IMuscle,
} from '../../../../../store/reducers/execises-reducer';
import { IAction, IRest, ITag } from '../../../../../types/types';

interface IinitialState {
  exerciseImageUrl: string;
  exerciseName: string;
  exercises: Array<IExercises>;
  exercisesCount: number;
  duration: string;
  valueKcal: string;
  selectedEquipement: Array<IEquipement>;
  selectedMuscles: Array<IMuscle>;
  selectedTags: Array<ITag>;
  typeValue: string;
  levelList: Array<ILevelList>;
  selectedLevel: any;
  rest: Array<IRest>;
  isNew: boolean

}

interface IExercises {
  image: string;
  title: string;
  time: string;
  restTime?: string;
  setCount?: number;
  exerciseCount: number;
  onPressDelete: () => void;
  onPressCopy: () => void;
}

interface ILevelList {
  id: number;
  title: string;
  selected: boolean;
}

export default () => {
  const levelList = [
    { id: 0, title: 'Beginner', selected: false },
    { id: 1, title: 'Intermediate', selected: false },
    { id: 2, title: 'Expert', selected: false },
  ];

  const initialState = {
    exerciseImageUrl: '',
    exerciseName: '',
    exercises: [],
    exercisesCount: 0,
    duration: '0',
    valueKcal: '0',
    selectedEquipement: [],
    selectedMuscles: [],
    selectedTags: [],
    typeValue: '',
    levelList: levelList,
    selectedLevel: {},
    rest: [],
    isNew: false

  };

  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_EXERCISE_IMAGE_URL':
        return { ...state, exerciseImageUrl: action.payload };
      case 'SET_EXERCISE_NAME':
        return { ...state, exerciseName: action.payload };
      case 'SET_EXERCISES':
        return { ...state, exercises: action.payload };
      case 'SET_EXERCISES_COUNT':
        return { ...state, exercisesCount: action.payload };
      case 'SET_DURATION':
        return { ...state, duration: action.payload };
      case 'SET_VALUE_KCAL':
        return { ...state, valueKcal: action.payload };
      case 'SET_SELECTED_EQUIPEMENT':
        return { ...state, selectedEquipement: action.payload };
      case 'SET_SELECTED_MUSCLES':
        return { ...state, selectedMuscles: action.payload };
      case 'SET_SELECTED_TAGS':
        return { ...state, selectedTags: action.payload };
      case 'SET_TYPE_VALUE':
        return { ...state, typeValue: action.payload };
      case 'SET_SELECTED_LEVEL':
        return { ...state, selectedLevel: action.payload };
      case 'SET_REST':
        return { ...state, rest: action.payload };
      case 'SET_ISNEW':
        return { ...state, isNew: action.payload };
      default:
        throw new Error();
    }
  }
  const [state, dispatchState] = useReducer(reducer, initialState);

  return {
    state,
    dispatchState,
  };
};
