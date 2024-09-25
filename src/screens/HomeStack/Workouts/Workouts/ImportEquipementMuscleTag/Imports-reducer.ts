import {useReducer} from 'react';
import {
  IEquipement,
  IMuscle,
} from '../../../../../store/reducers/execises-reducer';
import {ITag, IAction} from '../../../../../types/types';

interface IinitialState {
  isSubmitedEquipements: Array<IEquipement>;
  isSubmitedMuscles: Array<IMuscle>;
  isSubmitedTags: Array<ITag>;
}

export default () => {
  const initialState = {
    isSubmitedEquipements: [],
    isSubmitedMuscles: [],
    isSubmitedTags: [],
  };
  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_ADD_EQUIPEMENTS':
        return {...state, isSubmitedEquipements: action.payload};
      case 'SET_ADD_MUSCLES':
        return {...state, isSubmitedMuscles: action.payload};
      case 'SET_ADD_TAGS':
        return {...state, isSubmitedTags: action.payload};
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
