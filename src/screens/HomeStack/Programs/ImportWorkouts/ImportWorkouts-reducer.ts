import {useReducer} from 'react';
import {IAction} from '../../../../types/types';
import {IActivity} from '../../../../store/reducers/activity-reducer';
import {IProgramWorkouts} from '../../../../store/reducers/programs-reducer';

interface IinitialState {
  submitedWorkouts: IProgramWorkouts;
  submitedActivities: Array<IActivity>;
}

export default () => {
  const initialState = {
    submitedWorkouts: {
      exercises: [],
      workouts: [],
    },
    submitedActivities: [],
  };
  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_ADD_EXERCISE':
        return {
          ...state,
          submitedWorkouts: {
            ...state.submitedWorkouts,
            exercises: action.payload,
          },
        };
      case 'SET_ADD_WORKOUT':
        return {
          ...state,
          submitedWorkouts: {
            ...state.submitedWorkouts,
            workouts: action.payload,
          },
        };
      case 'SET_ADD_ACTIVITY':
        return {
          ...state,
          submitedActivities: action.payload,
        };
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
