import {useReducer} from 'react';
import {IActivity} from '../../../../store/reducers/activity-reducer';
import {IExecise} from '../../../../store/reducers/execises-reducer';
import {IWorkout} from '../../../../store/reducers/workout-reducer';
import {IAction} from '../../../../types/types';

interface IinitialState {
  valueKcal: string;
  valueMin: string;
  activity: {
    activityList: Array<IActivity>;
  };
  workout: {
    exerciseList: Array<IExecise>;
    workoutList: Array<IWorkout>;
  };
}

export default () => {
  const initialState = {
    valueKcal: '0',
    valueMin: '50',
    activity: {
      activityList: [],
    },
    workout: {
      exerciseList: [],
      workoutList: [],
    },
  };

  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_VALUE_KCAL':
        return {...state, valueKcal: action.payload};
      case 'SET_VALUE_MIN':
        return {...state, valueMin: action.payload};
      case 'SET_ACTIVITY':
        return {...state, activity: action.payload};
      case 'SET_WORKOUT':
        return {...state, workout: action.payload};
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
