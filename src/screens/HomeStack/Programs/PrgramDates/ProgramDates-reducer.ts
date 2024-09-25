import {useMemo, useReducer} from 'react';
import {IProgramDay} from '../../../../store/reducers/programs-reducer';
import {IAction} from '../../../../types/types';

interface IinitialState {
  days: Array<IProgramDay>;
  submitedDays: Array<IProgramDay>;
}

export default () => {
  let list = useMemo(() => {
    let result: IProgramDay[] = [];
    for (let i = 0; i < 35; i++) {
      const day: IProgramDay = {
        id: i,
        nutritions: [],
        workouts: {activities: [], workouts: []},
        edits: [],
        files: [],
        rest: false,
      };
      result.push(day);
    }
    return result;
  }, []);

  const initialState = {
    days: list,
    submitedDays: [],
  };

  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_ADD_DAYS':
        return {...state, submitedDays: action.payload};
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
