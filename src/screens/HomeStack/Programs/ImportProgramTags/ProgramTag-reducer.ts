import {useReducer} from 'react';
import {IAction, ITag} from '../../../../types/types';

interface IinitialState {
  isSubmitedTags: Array<ITag>;
}

export default () => {
  const initialState = {
    isSubmitedTags: [],
  };
  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
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
