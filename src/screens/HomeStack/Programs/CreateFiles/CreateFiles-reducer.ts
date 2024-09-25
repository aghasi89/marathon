import {useReducer} from 'react';
import {IAction, IFile} from '../../../../types/types';

interface IinitialState {
  files: Array<IFile>;
}

export default () => {
  const initialState = {
    files: [],
  };
  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_FILE':
        return {...state, files: action.payload};
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
