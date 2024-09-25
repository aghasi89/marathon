import { useReducer } from 'react';
import {
  IEquipement,
  IMuscle,
} from '../../../../../store/reducers/execises-reducer';
import { IAction, ITag } from '../../../../../types/types';

interface IinitialState {
  exerciseVideoUrl: string;
  exerciseName: string;
  typeValue: string;
  selectedEquipement: Array<IEquipement>;
  selectedMuscles: Array<IMuscle>;
  selectedTags: Array<ITag>;
  isNew: boolean
}

export default () => {
  const initialState = {
    exerciseVideoUrl: '',
    exerciseName: '',
    typeValue: '',
    selectedEquipement: [],
    selectedMuscles: [],
    selectedTags: [],
    isNew: false
  };
  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_EXERCISE_VIDEO_URL':
        return { ...state, exerciseVideoUrl: action.payload };
      case 'SET_EXERCISE_NAME':
        return { ...state, exerciseName: action.payload };
      case 'SET_TYPE_VALUE':
        return { ...state, typeValue: action.payload };
      case 'SET_SELECTED_EQUIPEMENT':
        return { ...state, selectedEquipement: action.payload };
      case 'SET_SELECTED_MUSCLES':
        return { ...state, selectedMuscles: action.payload };
      case 'SET_SELECTED_TAGS':
        return { ...state, selectedTags: action.payload };
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
