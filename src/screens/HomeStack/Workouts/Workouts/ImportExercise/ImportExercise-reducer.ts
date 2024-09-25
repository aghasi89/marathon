import {useReducer} from 'react';
import {IAction, ITag} from '../../../../../types/types';
import {IExecise} from '../../../../../store/reducers/execises-reducer';

interface IinitialState {
  isSubmitedExercises: Array<IExecise>;
  selectedTags: Array<ITag>;
  typeValue: string;
}

export default () => {
  const initialState = {
    isSubmitedExercises: [],
    selectedTags: [],
    typeValue: '',
  };
  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_ADD_EXERCISE':
        return {...state, isSubmitedExercises: action.payload};
      case 'SET_SELECTED_TAGS':
        return {...state, selectedTags: action.payload};
      case 'SET_TYPE_VALUE':
        return {...state, typeValue: action.payload};
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
