import {useReducer} from 'react';
import {IAction, ISpeciality} from '../../../../types/types';

interface IinitialState {
  specialities: Array<ISpeciality>;
  selectedList: Array<ISpeciality>;
}

export default () => {
  const initialState = {
    specialities: [
      {id: 0, title: 'Abs'},
      {id: 1, title: 'Quadriceps'},
      {id: 2, title: 'Chaest'},
      {id: 3, title: 'Back'},
      {id: 4, title: 'Calves'},
      {id: 5, title: 'Forearms'},
      {id: 6, title: 'Triceps'},
      {id: 7, title: 'Shoulders'},
    ],
    selectedList: [],
  };
  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_ADD_SPECIALITY':
        return {...state, selectedList: action.payload};
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
