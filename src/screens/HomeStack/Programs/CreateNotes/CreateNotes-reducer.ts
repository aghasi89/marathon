import {useReducer} from 'react';
import {IAction, INote} from '../../../../types/types';

interface IinitialState {
  notes: Array<INote>;
  inputNote: INote;
}

export default () => {
  const initialState = {
    notes: [],
    inputNote: '',
  };
  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_NOTE':
        return {...state, notes: action.payload};
      case 'SET_INPUT_NOTE':
        return {...state, inputNote: action.payload};
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
